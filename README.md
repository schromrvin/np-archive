# NP Archive: Interactive Campus Heritage App

![NP Archive Banner](/public/logo.png)

> **Preserving Memories, Celebrating History.**

**NP Archive** is a modern progressive web application designed to help students and visitors explore the rich history of Ngee Ann Polytechnic. The application combines archival storytelling with interactive gamification to create an engaging heritage experience.

This project was built as part of the **Year 3 PROID Assignment**.

## 📱 Application Overview

The application features a premium, minimalist design inspired by **Apple's Liquid Glass** aesthetic, utilizing the official NP Brand Colors (Navy Blue & Gold). Key components include:

### 🔍 Scavenger Hunt (Main Feature)
An interactive game that guides users across campus landmarks.
- **Clue System**: Users receive riddles to find specific locations.
- **QR Simulation**: A realistic camera interface simulates scanning QR codes at checkpoints.
- **Trivia Challenges**: Quizzes related to the location's history unlock the next stage.
- **Leaderboard**: A ranking system to foster friendly competition.
- **Progress Tracking**: Local state management tracks user points and current stage.

### 🏛️ Future Modules (Placeholders)
- **Memory Hub**: A social feed for students to share and discover campus stories.
- **Heritage Map**: An interactive map view of historical landmarks.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/) (HashRouter)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

We have detailed guides for setting up and deploying the project:

- **[Developer Setup Guide](./SETUP.md)**: Instructions for installing dependencies and running the local development server.
- **[Deployment Guide](./DEPLOY.md)**: Steps to deploy the application to GitHub Pages.

### Quick Start
```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Opens at http://localhost:3000
```

## 📂 Project Structure

The project is organized in the root directory:

```
np-archive/
├── src/
│   ├── components/        # Reusable UI (GlassPane, NavBar)
│   ├── features/          # Feature-specific logic
│   │   └── scavenger-hunt/# Game dashboard, data, and modal logic
│   ├── pages/             # Main route pages (Home)
│   ├── lib/               # Utilities (cn, tailwind-merge)
│   └── App.tsx            # Main router and layout configuration
├── public/                # Static assets
└── ...config files        # Vite, Tailwind, TypeScript configs
```

## 🎨 Design Philosophy

- **Glassmorphism**: Extensive use of backdrop blur (`backdrop-blur-xl`), semi-transparent whites, and subtle borders to create depth and hierarchy.
- **Responsiveness**: A "Bottom Tab" navigation for mobile users (similar to iOS) and a "Floating Capsule" navigation for desktop users.
- **NP Branding**:
  - `np-navy`: `#002F6C`
  - `np-gold`: `#F2A900`

---
*Built for Ngee Ann Polytechnic PROID Assignment.*
