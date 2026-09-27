import {
  Home, LayoutDashboard, CalendarCheck, CalendarDays, Users, BookOpen,
  Wallet, ListTodo, FileBarChart2, Clock, HelpCircle,
  Megaphone, BellRing, ChartNoAxesCombined, Database, ScrollText, UserCog,
  Building2, ShieldCheck, GraduationCap, UserRound, Baby, IndianRupee
} from 'lucide-react'

export const PLANS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: '₹25,000',
    perYear: true,
    tagline: 'For small schools that need the essentials, done right.',
  },
  standard: {
    id: 'standard',
    name: 'Standard',
    price: '₹50,000',
    perYear: true,
    tagline: 'Complete daily school operations with parent engagement.',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: '₹96,000',
    perYear: true,
    tagline: 'Everything, supercharged with analytics, AI and audit tools.',
  },
}

export const ROLES = [
  {
    id: 'principal', name: 'Principal', icon: Building2, plan: 'premium',
    email: 'principal@demoschool.edu', desc: 'Full school oversight',
    blurb: 'Whole-school oversight, staff and results.',
  },
  {
    id: 'admin', name: 'Admin', icon: ShieldCheck, plan: 'standard',
    email: 'admin@demoschool.edu', desc: 'Staff & student management',
    blurb: 'Students, staff records and admissions.',
  },
  {
    id: 'teacher', name: 'Teacher', icon: GraduationCap, plan: 'standard',
    email: 'teacher@demoschool.edu', desc: 'Classes, grades & attendance',
    blurb: 'Your classes, attendance and grading.',
  },
  {
    id: 'parent', name: 'Parent', icon: UserRound, plan: 'standard',
    email: 'parent@demoschool.edu', desc: 'Fees, homework & updates',
    blurb: "Your wards' fees, attendance and results.",
  },
  {
    id: 'student', name: 'Student', icon: Baby, plan: 'standard',
    email: 'student@demoschool.edu', desc: 'Assignments & results',
    blurb: 'Homework, tests and your class rank.',
  },
  {
    id: 'accounts', name: 'Accounts', icon: IndianRupee, plan: 'standard',
    email: 'accounts@demoschool.edu', desc: 'Fees & receipts',
    blurb: 'Invoices, collections and receipts.',
  },
]

export const ROLES_BY_PLAN = {
  basic: ['principal', 'admin'],
  standard: ['admin', 'teacher', 'parent', 'student', 'accounts'],
  premium: ['principal', 'admin', 'teacher', 'parent', 'student', 'accounts'],
}

export const MODULES = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    path: '/app/home',
    group: 'Start',
    blurb: 'Today at a glance',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/app/overview',
    group: 'Start',
    blurb: 'Your role-specific dashboard',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: CalendarCheck,
    path: '/app/attendance',
    group: 'Academics',
    blurb: 'QR, GPS or manual marking',
    plans: ['basic', 'standard', 'premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'timetable',
    label: 'Timetable',
    icon: CalendarDays,
    path: '/app/timetable',
    group: 'Academics',
    blurb: 'Weekly class schedule',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'homework',
    label: 'Homework',
    icon: ListTodo,
    path: '/app/homework',
    group: 'Academics',
    blurb: 'Assign, submit and grade',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher', 'student'],
  },
  {
    id: 'tests',
    label: 'Tests & Results',
    icon: FileBarChart2,
    path: '/app/tests',
    group: 'Academics',
    blurb: 'Schedule tests, publish results',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher', 'student'],
  },
  {
    id: 'notes',
    label: 'Notes Library',
    icon: BookOpen,
    path: '/app/notes',
    group: 'Academics',
    blurb: 'Share notes with any batch',
    plans: ['standard', 'premium'],
  },
  {
    id: 'doubts',
    label: 'Doubts',
    icon: HelpCircle,
    path: '/app/doubts',
    group: 'Academics',
    blurb: 'Ask and answer subject doubts',
    plans: ['standard', 'premium'],
  },
  {
    id: 'fees',
    label: 'Fee Management',
    icon: Wallet,
    path: '/app/fees',
    group: 'Administration',
    blurb: 'Invoices, payments, receipts',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'accounts', 'parent'],
  },
  {
    id: 'students',
    label: 'Students & Staff',
    icon: Users,
    path: '/app/students',
    group: 'Administration',
    blurb: 'Rosters and staff records',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'schedule',
    label: 'Schedule',
    icon: Clock,
    path: '/app/schedule',
    group: 'Administration',
    blurb: 'Events and meetings',
    plans: ['standard', 'premium'],
  },
  {
    id: 'announcements',
    label: 'Announcements',
    icon: Megaphone,
    path: '/app/announcements',
    group: 'Administration',
    blurb: 'Broadcast notices to families',
    plans: ['basic', 'standard', 'premium'],
  },
  {
    id: 'notifications',
    label: 'Parent Alerts',
    icon: BellRing,
    path: '/app/notifications',
    group: 'Administration',
    blurb: 'SMS, WhatsApp and email alerts',
    plans: ['standard', 'premium'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'staff',
    label: 'Staff Directory',
    icon: UserCog,
    path: '/app/staff',
    group: 'Administration',
    blurb: 'Teaching and admin staff',
    plans: ['basic'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: ChartNoAxesCombined,
    path: '/app/analytics',
    group: 'Insights',
    blurb: 'Deep performance reporting',
    plans: ['premium'],
    roles: ['principal', 'admin'],
  },
  {
    id: 'questionbank',
    label: 'Question Bank',
    icon: Database,
    path: '/app/questionbank',
    group: 'Insights',
    blurb: '40,000+ items with AI builder',
    plans: ['premium'],
    roles: ['principal', 'admin', 'teacher'],
  },
  {
    id: 'activity',
    label: 'Activity Log',
    icon: ScrollText,
    path: '/app/activity',
    group: 'Insights',
    blurb: 'Every action, with user and IP',
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
  (ROLES_BY_PLAN[planId] || []).map((id) => ROLES.find((r) => r.id === id))

export const roleById = (id) => ROLES.find((r) => r.id === id)

export const moduleById = (id) => MODULES.find((m) => m.id === id)

/** Modules a role can actually open, minus the two Start-screen entries. */
export const workModulesFor = (planId, roleId) =>
  modulesFor(planId, roleId).filter((m) => m.group !== 'Start')

/** Group modules by their `group` label, preserving declaration order. */
export const groupModules = (modules) => {
  const groups = []
  for (const m of modules) {
    const g = groups.find((x) => x.name === m.group)
    if (g) g.items.push(m)
    else groups.push({ name: m.group, items: [m] })
  }
  return groups
}

export const appName = 'EduSuite Pro'