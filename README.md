# EduSuite Pro — School Management System Prototype

A polished, client-ready interactive prototype of a complete school management
platform. Built to be pitched live to schools across **three plan tiers** —
Basic, Standard and Premium — each with its own roles, modules and demo flow.

▶ Live demo: <https://wreckerks.github.io/school-app-prototype/>

## Features

### 🚀 Start-Demo Pitch Flow
- Landing page with hero, features, plan cards and testimonials (claymorphism light design)
- **Start Demo** → plan picker (`/start`) → role login (`/login?plan=...`) → full app (`/app`)
- Plan chips + per-plan **role grid** (Basic: Principal, Admin • Standard: + Teacher/Parent/Student/Accounts • Premium: all roles)
- One-click **Instant demo** and email/password sign-in (any email, `demo123`) with zero friction

### 🧭 Multi-Page App (`/app`)
- Dedicated page per module, gated by plan + role (`src/lib/registry.jsx`)
- **Overview** (role-aware dashboards), **Attendance** (interactive register; Premium adds QR + GPS verification), **Timetable**, **Homework** (grading dialogs), **Tests & Results**, **Notes Library**, **Doubts**, **Fee Management** (UPI/Card/Wallet), **Students & Staff**, **Schedule**, **Announcements**, **Parent Alerts** (SMS/WhatsApp/Email/Call), **Staff Directory** (Basic), **Analytics** (recharts), **Question Bank**, **Activity Log**
- Topbar **plan switcher** ("Show Standard plan") and **role switcher** (no logout) for live pivots mid-pitch

### 📲 Installable PWA
- `<150KB` footprint app shell, offline-capable service worker, manifest + icons
- Installable to the home screen on Android, iOS and desktop

### 🤖 Android APK (Capacitor)
- The `/app` web build is packaged into a real Android app via **Capacitor**
- `apk.yml` workflow builds `app-debug.apk` on every push — grab it from **Actions → Artifacts**
- `release.yml` publishes the APK to **GitHub Releases** when you push a `v*` tag

## Plan Tiers

| Plan | Price | Roles | Modules |
|------|-------|-------|---------|
| **Basic** | ₹25,000 / year | Principal, Admin | Overview, Attendance, Timetable, Staff Directory, Announcements |
| **Standard** | ₹50,000 / year | Admin, Teacher, Parent, Student, Accounts | + Homework, Tests, Notes, Doubts, Fees, Students, Schedule, Parent Alerts |
| **Premium** | ₹96,000 / year | All roles | + Analytics, AI Question Bank, Full Activity Log, QR/GPS attendance |

## Tech Stack

- **React 19 + Vite 8** (lazy route code-splitting, hash routing for Pages)
- **Claymorphism design system** — indigo/emerald/gold palette, Plus Jakarta Sans, clay shadows & animations
- **lucide-react** icons, **recharts** analytics charts
- **Capacitor** for native Android packaging, **PWA** service worker + manifest
- Two GitHub Actions: **Pages deploy** and **APK build**

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # oxlint
```

### Building the APK locally (requires JDK 17+ and Android SDK)

```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npm run build -- --base=./
npx cap add android
npx cap sync android
cd android && gradlew assembleDebug   # output: android/app/build/outputs/apk/debug/
```

Prefer CI — just push and download the APK from **Actions → Build Android APK → Artifacts**.

## Project Structure

```
src/
├── components/
│   ├── DashboardLayout.jsx   # App shell: sidebar, topbar, plan/role switchers
│   ├── Navbar.jsx            # Floating glass navbar (Home + Live Demo)
│   ├── ui.jsx                # Panels, stat cards, avatars, stock images, toasts
│   ├── CountUp.jsx           # Eased number animation
│   └── ScrollToTop.jsx, BackToTop.jsx
├── context/
│   └── AuthContext.jsx       # Demo auth: startDemo / loginAsDemo / switchPlan / switchRole
├── lib/
│   ├── registry.jsx          # PLANS, ROLES, MODULES gating source of truth
│   └── mock.js               # Realistic mock data (~40k question bank etc.)
├── pages/
│   ├── Landing.jsx           # Hero + features + plans + testimonials + CTA
│   ├── StartDemo.jsx         # Plan picker launcher
│   ├── Login.jsx             # Plan chips + role grid + instant demo
│   ├── NotFound.jsx          # 404
│   └── app/                  # 16 dedicated feature pages
├── App.jsx                   # Lazy routes + auth/toast providers
└── index.css                 # Claymorphism design system
```

## Note

Front-end prototype — all data is mocked in-memory. Built to be shown live to
schools as a visual demonstration of the product and its pricing tiers.