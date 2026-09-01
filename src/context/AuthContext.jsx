/* oxlint-disable react/only-export-components -- context + hook pattern is intentional */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ROLES, rolesForPlan, roleById } from '../lib/registry'

const DEMO_NAMES = {
  principal: 'Dr. Meera Iyer',
  admin: 'Sameer Joshi',
  teacher: 'Priya Sharma',
  parent: 'Anita Sharma',
  student: 'Arjun Patel',
  accounts: 'Rahul Nair',
}

function makeUser(roleId, planId, isDemo = true) {
  const role = roleById(roleId) || ROLES[0]
  return {
    name: DEMO_NAMES[role.id] || role.name,
    role: role.name,
    roleId: role.id,
    icon: role.icon,
    plan: planId,
    color: role.color,
    email: role.email,
    isDemo,
  }
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('edusuite_user')
      if (!raw) return null
      const saved = JSON.parse(raw)
      if (saved && !rolesForPlan(saved.plan).some((r) => r.id === saved.roleId)) {
        const okRole = rolesForPlan(saved.plan)[0]
        return { ...saved, roleId: okRole.id, role: okRole.name, icon: okRole.icon, color: okRole.color, email: okRole.email }
      }
      return saved
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

  const loginAsDemo = useCallback((roleId, planId) => {
    const plan = planId || (roleById(roleId) || {}).plan || 'standard'
    setUser(makeUser(roleId, plan))
    return roleById(roleId) || ROLES[0]
  }, [])

  // Fresh start for a client pitch: plan is fixed for the whole session flow
  const startDemo = useCallback((planId) => {
    const firstRole = rolesForPlan(planId)[0]
    setUser(makeUser(firstRole.id, planId))
    return firstRole
  }, [])

  const switchPlan = useCallback((planId) => {
    if (!user) return
    const allowed = rolesForPlan(planId)
    const keepRole = allowed.some((r) => r.id === user.roleId)
    const nextRole = keepRole ? user.roleId : allowed[0].id
    setUser({ ...user, plan: planId, ...(keepRole ? {} : pickRoleFields(nextRole)) })
  }, [user])

  const switchRole = useCallback((roleId) => {
    setUser((u) => (u ? { ...u, ...pickRoleFields(roleId) } : u))
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({
      user,
      loginAsDemo,
      startDemo,
      switchPlan,
      switchRole,
      logout,
      rolesForPlan: (p) => rolesForPlan(p),
      isAuthenticated: Boolean(user),
    }),
    [user, loginAsDemo, startDemo, switchPlan, switchRole, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function pickRoleFields(roleId) {
  const role = roleById(roleId)
  return { roleId: role.id, role: role.name, icon: role.icon, color: role.color, email: role.email }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}