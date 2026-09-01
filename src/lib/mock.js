export const teacher = 'Priya Sharma'

export const classes = [
  { name: 'Class 9A', total: 42, present: 39, absent: 3, pct: 93 },
  { name: 'Class 9B', total: 38, present: 35, absent: 3, pct: 92 },
  { name: 'Class 10A', total: 45, present: 41, absent: 4, pct: 91 },
  { name: 'Class 10B', total: 40, present: 37, absent: 3, pct: 93 },
  { name: 'Class 11A', total: 44, present: 42, absent: 2, pct: 95 },
  { name: 'Class 12A', total: 41, present: 38, absent: 3, pct: 93 },
]

export const timetable = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  periods: [
    { time: '08:00–08:45', subjects: ['Math', 'English', 'Science', 'Math', 'Hindi'] },
    { time: '08:45–09:30', subjects: ['English', 'Math', 'Hindi', 'Science', 'Math'] },
    { time: '09:30–09:45', subjects: ['BREAK', 'BREAK', 'BREAK', 'BREAK', 'BREAK'] },
    { time: '09:45–10:30', subjects: ['Science', 'Hindi', 'Math', 'English', 'Science'] },
    { time: '10:30–11:15', subjects: ['Hindi', 'Science', 'English', 'Social', 'English'] },
    { time: '11:15–12:00', subjects: ['Social', 'Social', 'Science', 'Hindi', 'Social'] },
  ],
}

export const staff = [
  { name: 'Dr. Meera Iyer', role: 'Principal', dept: 'Administration', subject: '—', phone: '+91 98220 11401', years: 12 },
  { name: 'Sameer Joshi', role: 'Vice Principal', dept: 'Administration', subject: 'Mathematics', phone: '+91 98220 11402', years: 9 },
  { name: 'Priya Sharma', role: 'Teacher', dept: 'Science', subject: 'Physics', phone: '+91 98220 11403', years: 6 },
  { name: 'Rajesh Kumar', role: 'Teacher', dept: 'Science', subject: 'Chemistry', phone: '+91 98220 11404', years: 8 },
  { name: 'Sneha Rao', role: 'Teacher', dept: 'Languages', subject: 'English', phone: '+91 98220 11405', years: 5 },
  { name: 'Vivek Anand', role: 'Teacher', dept: 'Mathematics', subject: 'Math', phone: '+91 98220 11406', years: 7 },
  { name: 'Anita Sharma', role: 'Coordinator', dept: 'Admissions', subject: '—', phone: '+91 98220 11407', years: 4 },
]

export const students = [
  { name: 'Arjun Patel', cls: '10A', roll: 1, attendance: 96, score: 88, fees: 'Paid', parent: 'Amit Patel' },
  { name: 'Priya Nair', cls: '10A', roll: 2, attendance: 92, score: 91, fees: 'Due', parent: 'Suresh Nair' },
  { name: 'Rahul Verma', cls: '10A', roll: 3, attendance: 89, score: 74, fees: 'Paid', parent: 'Kavita Verma' },
  { name: 'Sara Khan', cls: '10B', roll: 14, attendance: 94, score: 86, fees: 'Paid', parent: 'Imran Khan' },
  { name: 'Dev Malhotra', cls: '10B', roll: 15, attendance: 81, score: 69, fees: 'Overdue', parent: 'Nidhi Malhotra' },
  { name: 'Ananya Iyer', cls: '11A', roll: 9, attendance: 97, score: 93, fees: 'Paid', parent: 'Ramesh Iyer' },
  { name: 'Kabir Singh', cls: '12A', roll: 22, attendance: 90, score: 82, fees: 'Due', parent: 'Manpreet Singh' },
]

export const homework = [
  { id: 'HW-241', subject: 'Mathematics', cls: '9A', title: 'Linear Equations — Exercise 3.2', deadline: '02 Sep, 09:00', assigned: '01 Sep', status: 'Active', submissions: 41, total: 46 },
  { id: 'HW-240', subject: 'Science', cls: '10A', title: 'Photosynthesis lab report', deadline: '02 Sep, 11:00', assigned: '01 Sep', status: 'Active', submissions: 38, total: 45 },
  { id: 'HW-239', subject: 'English', cls: '10A', title: 'Essay — My Inspirational Figure', deadline: '30 Aug', assigned: '28 Aug', status: 'Reviewed', submissions: 45, total: 45 },
  { id: 'HW-238', subject: 'Hindi', cls: '9B', title: 'Kavita Kavya Lekhan', deadline: '29 Aug', assigned: '26 Aug', status: 'Reviewed', submissions: 37, total: 38 },
]

export const testSeries = [
  { id: 'T-118', name: 'Weekly Test — Science', cls: '10A', subject: 'Science', date: '01 Sep', status: 'Completed', avg: 72 },
  { id: 'T-117', name: 'Mathematics Test 4', cls: '9A', subject: 'Mathematics', date: '05 Sep', status: 'Upcoming', avg: null },
  { id: 'T-116', name: 'Pre-Board Mock 1', cls: '12A', subject: 'All', date: '12 Sep', status: 'Upcoming', avg: null },
  { id: 'T-115', name: 'English Grammar Quiz', cls: '10B', subject: 'English', date: '29 Aug', status: 'Completed', avg: 81 },
]

export const notes = [
  { title: 'Gravitation — Full Chapter Notes', subject: 'Physics', cls: '10A', type: 'PPT', author: 'Priya Sharma', size: '2.4 MB', pages: 18 },
  { title: 'Trigonometry Formula Sheet', subject: 'Mathematics', cls: '9A', type: 'PDF', author: 'Vivek Anand', size: '800 KB', pages: 6 },
  { title: 'Chemical Bonding Revision', subject: 'Chemistry', cls: '11A', type: 'PDF', author: 'Rajesh Kumar', size: '1.2 MB', pages: 21 },
  { title: 'English Grammar — Tenses', subject: 'English', cls: '10B', type: 'DOC', author: 'Sneha Rao', size: '460 KB', pages: 12 },
]

export const fees = [
  { id: 'F-341', student: 'Arjun Patel', cls: '10A', title: 'Tuition Fee — Sep', amount: 8500, status: 'Paid', method: 'UPI', date: '31 Aug' },
  { id: 'F-342', student: 'Priya Nair', cls: '10A', title: 'Tuition Fee — Sep', amount: 8500, status: 'Due', method: '—', date: '—' },
  { id: 'F-343', student: 'Rahul Verma', cls: '10A', title: 'Activity Fee', amount: 2000, status: 'Paid', method: 'Card', date: '29 Aug' },
  { id: 'F-344', student: 'Sara Khan', cls: '10B', title: 'Tuition Fee — Sep', amount: 8500, status: 'Pending', method: 'Wallet (processing)', date: '01 Sep' },
  { id: 'F-345', student: 'Dev Malhotra', cls: '10B', title: 'Transport Fee — Q3', amount: 4200, status: 'Overdue', method: '—', date: '—' },
  { id: 'F-346', student: 'Ananya Iyer', cls: '11A', title: 'Tuition Fee — Sep', amount: 9500, status: 'Paid', method: 'UPI', date: '30 Aug' },
]

export const schedule = [
  { time: '09:00', ampm: 'AM', title: 'Maths', type: 'Class', cls: '10A', live: true },
  { time: '10:30', ampm: 'AM', title: 'Physics', type: 'Class', cls: '10A', live: true },
  { time: '12:00', ampm: 'PM', title: 'Chemistry Lab', type: 'Lab', cls: '11A', live: false },
  { time: '14:00', ampm: 'PM', title: 'English', type: 'Class', cls: '10B', live: false },
  { time: '15:30', ampm: 'PM', title: 'Biology Quiz', type: 'Test', cls: '9A', live: false },
]

export const announcements = [
  { id: 'A-80', title: 'Parent-Teacher Meeting on Saturday', priority: 'High', date: '01 Sep', body: "PTM for all classes will be held on 20 Sep from 9:00 AM in the main hall. Kindly carry the ward's report card." },
  { id: 'A-79', title: 'Gandhi Jayanti Holiday', priority: 'Medium', date: '31 Aug', body: 'The school will remain closed on 2 Oct on account of Gandhi Jayanti. Classes resume 3 Oct.' },
  { id: 'A-78', title: 'Science Exhibition Registration', priority: 'Low', date: '29 Aug', body: 'Students of Grades 9–12 can register for the inter-school Science Exhibition until 10 Sep.' },
]

export const doubts = [
  { id: 'D-19', student: 'Arjun Patel', subject: 'Mathematics', question: 'How do I solve quadratic inequalities with two roots?', status: 'Pending', raised: 'Today, 07:12' },
  { id: 'D-18', student: 'Priya Nair', subject: 'Physics', question: 'Why is the image formed by a convex lens inverted?', status: 'Resolved', raised: 'Yesterday', solution: 'Rays converge after refraction; the inversion is due to the intersection of refracted rays below the principal axis.' },
  { id: 'D-17', student: 'Sara Khan', subject: 'Chemistry', question: 'Difference between covalent and ionic bonds in table form?', status: 'Resolved', raised: '27 Aug', solution: 'Covalent shares electrons (non-metals), ionic transfers electrons (metal + non-metal). Attached table in notes.' },
  { id: 'D-16', student: 'Dev Malhotra', subject: 'Biology', question: 'Diagram of the human heart — which chambers are labelled X and Y in the worksheet?', status: 'Pending', raised: 'Yesterday, 16:40' },
]

export const activityLog = [
  { action: 'Recorded payment ₹8,500 (UPI) for Arjun Patel', user: 'Rahul Nair', ip: '192.168.1.42', category: 'Fees', time: '31 Aug 2026, 14:22', tone: 'success' },
  { action: 'Marked attendance for Class 10A (via GPS)', user: 'Priya Sharma', ip: '192.168.1.53', category: 'Attendance', time: '01 Sep 2026, 08:05', tone: 'success' },
  { action: 'Created test "Pre-Board Mock 1"', user: 'Sameer Joshi', ip: '192.168.1.18', category: 'Tests', time: '31 Aug 2026, 11:47', tone: 'info' },
  { action: 'Assigned homework HW-241 to Class 9A', user: 'Vivek Anand', ip: '192.168.1.29', category: 'Homework', time: '01 Sep 2026, 09:12', tone: 'warn' },
  { action: 'Login with role Teacher', user: 'Priya Sharma', ip: '192.168.1.53', category: 'Auth', time: '01 Sep 2026, 08:00', tone: 'info' },
  { action: 'Resolved doubt D-18 (Physics)', user: 'Sameer Joshi', ip: '192.168.1.18', category: 'Doubts', time: '31 Aug 2026, 15:20', tone: 'success' },
]

export const upcomingEvents = [
  { type: 'Class', title: 'Maths — Quadratic Equations', batch: 'Class 10A', date: 'Today, 09:00 AM' },
  { type: 'Test', title: 'Weekly Test — Science', batch: 'Class 10A', date: 'Today, 12:00 PM' },
  { type: 'PTM', title: 'Parent-Teacher Meeting', batch: 'All classes', date: 'Sat, 20 Sep' },
  { type: 'Special', title: 'Annual Day Rehearsal', batch: 'Grades 9–12', date: 'Fri, 26 Sep' },
]

export const recentTasks = [
  { title: 'Physics homework deadline', when: 'Today, 09:00 AM', done: false },
  { title: 'Weekly test — Science', when: 'Today, 12:00 PM', done: false },
  { title: 'English essay submission', when: 'Submitted', done: true },
]

export const subjectPerformance = [
  { subject: 'Mathematics', score: 88, color: '#6366f1' },
  { subject: 'Physics', score: 92, color: '#8b5cf6' },
  { subject: 'Chemistry', score: 85, color: '#10b981' },
  { subject: 'Biology', score: 90, color: '#f59e0b' },
]

export const chartTopicData = [
  { topic: 'Algebra', score: 82 }, { topic: 'Geometry', score: 68 },
  { topic: 'Trigonometry', score: 74 }, { topic: 'Calculus', score: 91 },
  { topic: 'Stats', score: 77 }, { topic: 'Probability', score: 63 },
]

export const chartTrendData = [
  { month: 'Apr', score: 64 }, { month: 'May', score: 70 }, { month: 'Jun', score: 68 },
  { month: 'Jul', score: 76 }, { month: 'Aug', score: 82 }, { month: 'Sep', score: 88 },
]

export const chartBatchData = [
  { batch: '9A', math: 78, science: 72 },
  { batch: '9B', math: 74, science: 76 },
  { batch: '10A', math: 81, science: 88 },
  { batch: '10B', math: 79, science: 84 },
  { batch: '11A', math: 86, science: 91 },
  { batch: '12A', math: 84, science: 87 },
]

export const chartSkillData = [
  { skill: 'Concepts', term1: 70, term2: 86 },
  { skill: 'Numeracy', term1: 74, term2: 84 },
  { skill: 'Reasoning', term1: 66, term2: 79 },
  { skill: 'Application', term1: 72, term2: 88 },
  { skill: 'Speed', term1: 60, term2: 81 },
]

export const questionBank = [
  { id: 'Q-1001', subject: 'Mathematics', topic: 'Quadratic Equations', difficulty: 'Medium', text: 'The sum of the roots of x² − 6x + k = 0 is:', marks: 3 },
  { id: 'Q-1002', subject: 'Physics', topic: 'Gravitation', difficulty: 'Easy', text: 'Value of g at the surface of the Earth in SI units is:', marks: 2 },
  { id: 'Q-1003', subject: 'Chemistry', topic: 'Chemical Bonding', difficulty: 'Hard', text: 'In which of the following is the bond angle maximum?', marks: 4 },
  { id: 'Q-1004', subject: 'Biology', topic: 'Human Heart', difficulty: 'Medium', text: 'The chamber that pumps oxygenated blood to the body is:', marks: 3 },
  { id: 'Q-1005', subject: 'English', topic: 'Grammar', difficulty: 'Easy', text: 'Choose the correct form: "Neither Ram nor his friends ___ coming."', marks: 1 },
]

export const notifHistory = [
  { channel: 'SMS', to: 'All parents', message: 'Fee due reminder — Sep', status: 'Sent', delivered: 412, read: 388 },
  { channel: 'WhatsApp', to: 'Class 10A parents', message: 'PTM invite with slot link', status: 'Sent', delivered: 44, read: 41 },
  { channel: 'Email', to: 'Faculty', message: 'Staff meeting — Monday 8 AM', status: 'Sent', delivered: 18, read: 17 },
]

export const staffLeave = [
  { name: 'Sneha Rao', from: '05 Sep', to: '06 Sep', type: 'Sick', status: 'Approved' },
  { name: 'Rajesh Kumar', from: '12 Sep', to: '12 Sep', type: 'Personal', status: 'Pending' },
  { name: 'Anita Sharma', from: '19 Sep', to: '20 Sep', type: 'Casual', status: 'Approved' },
]