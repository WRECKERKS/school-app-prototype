/* oxlint-disable react/only-export-components -- context + hook pattern is intentional */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const demoRoles = [
  {
    id: 'principal',
    name: 'Principal',
    desc: 'Full school oversight',
    plan: 'premium',
    icon: '🏫',
    email: 'principal@demoschool.edu',
    color: '#6d5cff',
  },
  {
    id: 'admin',
    name: 'Admin',
    desc: 'Staff & student management',
    plan: 'standard',
    icon: '🛡️',
    email: 'admin@demoschool.edu',
    color: '#22c55e',
  },
  {
    id: 'teacher',
    name: 'Teacher',
    desc: 'Classes, grades & attendance',
    plan: 'standard',
    icon: '📚',
    email: 'teacher@demoschool.edu',
    color: '#3b82f6',
  },
  {
    id: 'parent',
    name: 'Parent',
    desc: 'Fees, homework & updates',
    plan: 'standard',
    icon: '👨‍👩‍👧',
    email: 'parent@demoschool.edu',
    color: '#f59e0b',
  },
  {
    id: 'student',
    name: 'Student',
    desc: 'Assignments & results',
    plan: 'premium',
    icon: '🎓',
    email: 'student@demoschool.edu',
    color: '#ec4899',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    desc: 'Fees & receipts',
    plan: 'standard',
    icon: '💰',
    email: 'accounts@demoschool.edu',
    color: '#2dd4bf',
  },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edusuite_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem('edusuite_user', JSON.stringify(user))
      else localStorage.removeItem('edusuite_user')
    } catch {
      // storage unavailable
    }
  }, [user])

  const loginAsDemo = (roleId) => {
    const role = demoRoles.find((r) => r.id === roleId) || demoRoles[0]
    setUser({
      name: role.name === 'Principal'
        ? 'Dr. Meera Iyer'
        : role.name === 'Admin'
          ? 'Sameer Joshi'
          : role.name === 'Teacher'
            ? 'Rajesh Kumar'
            : role.name === 'Parent'
              ? 'Anita Sharma'
              : role.name === 'Student'
                ? 'Aarav Sharma'
                : 'Rahul Nair',
      role: role.name,
      roleId: role.id,
      icon: role.icon,
      plan: role.plan,
      color: role.color,
      email: role.email,
      isDemo: true,
    })
    return role
  }

  const login = (email, roleId) => {
    const role = demoRoles.find((r) => r.id === roleId) || demoRoles[0]
    const displayName = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    setUser({
      name: displayName || 'Guest User',
      role: role.name,
      roleId: role.id,
      icon: role.icon,
      plan: role.plan,
      color: role.color,
      email,
      isDemo: false,
    })
  }

  const logout = () => setUser(null)

  const value = useMemo(
    () => ({ user, loginAsDemo, login, logout, demoRoles, isAuthenticated: Boolean(user) }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}