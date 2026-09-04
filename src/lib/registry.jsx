import {
  LayoutDashboard, CalendarCheck, CalendarDays, Users, BookOpen,
  Wallet, ListTodo, FileBarChart2, Clock, HelpCircle,
  Megaphone, BellRing, ChartNoAxesCombined, Database, ScrollText, UserCog
} from 'lucide-react'

export const PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '₹25,000',
    perYear: true,
    color: '#818cf8',
    soft: '#eef2ff',
    tagline: 'For small schools that need the essentials, done right.',
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    price: '₹50,000',
    perYear: true,
    color: '#6366f1',
    soft: '#e0e7ff',
    tagline: 'Complete daily school operations with parent engagement.',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '₹96,000',
    perYear: true,
    color: '#4f46e5',
    soft: '#ddd5f7',
    tagline: 'Everything, supercharged with analytics, AI and audit tools.',
  },
}

export const ROLES = [
  { id: 'principal', name: 'Principal', icon: '🏫', plan: 'premium', color: '#4f46e5', email: 'principal@demoschool.edu', desc: 'Full school oversight' },
  { id: 'admin', name: 'Admin', icon: '🛡️', plan: 'standard', color: '#7c3aed', email: 'admin@demoschool.edu', desc: 'Staff & student management' },
  { id: 'teacher', name: 'Teacher', icon: '📚', plan: 'standard', color: '#6366f1', email: 'teacher@demoschool.edu', desc: 'Classes, grades & attendance' },
  { id: 'parent', name: 'Parent', icon: '👨‍👩‍👧', plan: 'standard', color: '#3b82f6', email: 'parent@demoschool.edu', desc: 'Fees, homework & updates' },
  { id: 'student', name: 'Student', icon: '🎓', plan: 'standard', color: '#10b981', email: 'student@demoschool.edu', desc: 'Assignments & results' },
  { id: 'accounts', name: 'Accounts', icon: '💰', plan: 'standard', color: '#0ea5e9', email: 'accounts@demoschool.edu', desc: 'Fees & receipts' },
]

export const ROLES_BY_PLAN = {
  basic: ['principal', 'admin'],
  standard: ['admin', 'teacher', 'parent', 'student', 'accounts'],
  premium: ['principal', 'admin', 'teacher', 'parent', 'student', 'accounts'],
}

export const MODULES = [
  {
    id: 'dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/app',
    group: 'Overview',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: CalendarCheck,
    path: '/app/attendance',
    group: 'Academics',
    plans: ['basic', 'standard', 'premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: CalendarDays,
    path: '/app/timetable',
    group: 'Academics',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'homework',
    label: 'Homework',
    icon: ListTodo,
    path: '/app/homework',
    group: 'Academics',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher', 'student'],
  },
  {
    id: 'tests',
    label: 'Tests & Results',
    icon: FileBarChart2,
    path: '/app/tests',
    group: 'Academics',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher', 'student'],
  },
  {
    id: 'notes',
    label: 'Notes Library',
    icon: BookOpen,
    path: '/app/notes',
    group: 'Academics',
    plans: ['standard', 'premium'],
  },
  {
    id: 'doubts',
    label: 'Doubts',
    icon: HelpCircle,
    path: '/app/doubts',
    group: 'Academics',
    plans: ['standard', 'premium'],
  },
  {
    id: 'fees',
    label: 'Fee Management',
    icon: Wallet,
    path: '/app/fees',
    group: 'Administration',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'accounts', 'parent'],
  },
  {
    id: 'students',
    label: 'Students & Staff',
    icon: Users,
    path: '/app/students',
    group: 'Administration',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: Clock,
    path: '/app/schedule',
    group: 'Administration',
    plans: ['standard', 'premium'],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    icon: Megaphone,
    path: '/app/announcements',
    group: 'Administration',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'notifications',
    label: 'Parent Alerts',
    icon: BellRing,
    path: '/app/notifications',
    group: 'Administration',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'staff',
    label: 'Staff Directory',
    icon: UserCog,
    path: '/app/staff',
    group: 'Administration',
    plans: ['basic'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartNoAxesCombined,
    path: '/app/analytics',
    group: 'Insights',
    plans: ['premium'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'questionbank',
    label: 'Question Bank',
    icon: Database,
    path: '/app/questionbank',
    group: 'Insights',
    plans: ['premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'activity',
    label: 'Activity Log',
    icon: ScrollText,
    path: '/app/activity',
    group: 'Insights',
    plans: ['premium'],
    roles: ['principal', 'admin'],
  },
]

export const planModules = (planId) =>
  MODULES.filter((m) => m.plans.includes(planId))

export const modulesFor = (planId, roleId) =>
  MODULES.filter(
    (m) => m.plans.includes(planId) && (!m.roles || m.roles.includes(roleId)),
  )

export const rolesForPlan = (planId) =>
  ROLES_BY_PLAN[planId].map((id) => ROLES.find((r) => r.id === id))

export const roleById = (id) => ROLES.find((r) => r.id === id)

export const moduleById = (id) => MODULES.find((m) => m.id === id)

export const appName = 'EduSuite Pro'