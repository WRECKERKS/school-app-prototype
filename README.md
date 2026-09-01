# EduSuite Pro — School Management System Prototype

A polished, non-sloppy interactive prototype of a complete school management
platform, built to demo to schools. It showcases **three plan tiers** — Basic,
Standard, and Premium — each with a full interactive dashboard.

## Features

### 🗂️ Three Plan Tiers

| Plan | Price | Demo |
|------|-------|------|
| **Basic** | ₹25,000 / year | `/demo/basic` |
| **Standard** | ₹50,000 / year | `/demo/standard` |
| **Premium** | ₹96,000 / year | `/demo/premium` |

### 🔐 User / Role System
- Custom **login page** with role selection (Principal, Admin, Teacher, Parent, Student, Accounts)
- One-click **"Continue as Demo"** button — instantly logs you in as the chosen role
- Email/password sign-in flow
- Session persisted in `localStorage`
- Auth-aware navbar showing the signed-in user chip + logout

### 🖼️ Demo Dashboards
- **Basic Plan** — Multi-role access, attendance register, class timetable, staff directory, announcements, CSV export
- **Standard Plan** — Parent/student/accounts portals, homework module, live gradebook, fee payments, parent comms, library, staff leave
- **Premium Plan** — Custom permissions, multi-branch, AI lesson plans, AI quiz builder, AI report card remarks, 24/7 AI chatbot, bus tracking, white-label branding

## Tech Stack

- **React 19** + **Vite 8**
- **react-router-dom** (HashRouter)
- **lucide-react** for icons
- Custom dark, glassy design system with CSS variables & animations

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # oxlint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Auth-aware top navigation
│   └── DemoUserBanner.jsx     # Signed-in context banner
├── context/
│   └── AuthContext.jsx        # Authentication state & demo roles
├── pages/
│   ├── Landing.jsx            # Hero + plan cards + feature grid
│   ├── Login.jsx              # Sign-in + Continue as Demo
│   ├── Compare.jsx            # Full feature comparison table
│   └── demos/
│       ├── BasicDashboard.jsx
│       ├── StandardDashboard.jsx
│       └── PremiumDashboard.jsx
└── index.css                  # Design system
```

## Note

This is a **front-end prototype** — all data is mocked in-memory. It is designed
to be shown live to schools as a visual demonstration of the product.
