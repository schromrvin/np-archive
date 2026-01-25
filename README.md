# NP Archive: Interactive Campus Heritage App

![NP Archive Banner](/public/logo.png)

> **Preserving Memories, Celebrating History.**

**NP Archive** is a modern progressive web application designed to help students and visitors explore the rich history of Ngee Ann Polytechnic through cinematic storytelling and gamified discovery. Unlike static archives, this project transforms heritage into a living, interactive experience where the community actively participates in preserving the institution's legacy.

This project was built as part of the **Year 3 PROID Assignment**.

## 📱 Application Overview

The application features a premium, minimalist design inspired by **Apple's Liquid Glass** aesthetic, utilizing the official NP Brand Colors (Navy Blue & Gold) to create an emotional connection with the institution's history.

## ✨ Key Features (The 5 Pillars)

### 1. Interactive Timeline (Cinematic Entry Point)
A visual-first narrative gateway that uses parallax motion and cinematic transitions to tell NP's story.
- **Immersive Storytelling**: History unfolds spatially as users scroll, prioritizing archival imagery over dense text.
- **Living History**: Seamlessly integrates new milestones, ensuring the timeline evolves with the institution.

### 2. Explore (Virtual Spaces)
*Implemented as `Heritage Map` in the codebase.*
TRANSFORMS routine campus navigation into a discovery layer.
- **360° Campus View**: Clickable pins at key landmarks reveal their historical evolution.
- **Past-Present Comparison**: Interactive sliders show how spaces like the Library or Canteens have changed over decades.
- **Spatial Context**: Grounds heritage in the physical environment students use every day.

### 3. NP Chatbot (Conversational Guide)
An AI-powered digital guide that lowers the barrier to heritage engagement.
- **Natural Language & Context**: Ask questions like "When was the library built?" or "Tell me a fun fact about block 58."
- **Personalized Recommendations**: Guides users to relevant timeline eras or memory stories based on their interests.

### 4. Scavenger Hunt (Gamified Discovery)
Transforms heritage exploration into a social, event-based experience for occasions like NP Day or Orientation.
- **Clue System & QR Simulation**: Solves riddles to find locations and "scan" them using a realistic camera interface.
- **Trivia Challenges**: Unlocks history through gameplay rather than passive reading.
- **Leaderboard**: Fosters friendly competition and community spirit.

### 5. Memory Hub (Community Living Archive)
Shifts the narrative from institution-centered to people-centered.
- **Memory Wall**: An infinite canvas of student and alumni stories, photos, and reflections.
- **Community Forum**: A space for threaded discussions on campus life and shared experiences.
- **Digital Time Capsule**: Allows users to send messages to their future selves.
- **NP Wrapped**: A Spotify-style annual summary of the user's campus journey and school-specific vibes.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) (TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Routing**: [React Router](https://reactrouter.com/) (HashRouter)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
np-archive/
├── src/
│   ├── components/        # Shared UI (GlassPane, NavBar)
│   ├── features/          # Feature-specific logic
│   │   ├── chatbot/       # NP Chatbot logic
│   │   ├── memory-hub/    # Memory Wall, Threads, Wrapped, Capsules
│   │   ├── np-navigator/  # Explore / Heritage Map logic
│   │   └── scavenger-hunt/# Game dashboard, quizzes, and data
│   ├── pages/             # Main route pages (Home, Timeline)
│   ├── lib/               # Utilities (cn, tailwind-merge)
│   └── App.tsx            # Main router and layout configuration
├── public/                # Static assets (images, timeline html)
└── ...config files        # Vite, Tailwind, TypeScript configs
```

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

## 🎨 Design Philosophy

- **Glassmorphism**: Extensive use of backdrop blur (`backdrop-blur-xl`), semi-transparent whites, and subtle borders to create depth and hierarchy.
- **Responsiveness**: A "Bottom Tab" navigation for mobile users (similar to iOS) and a "Floating Capsule" navigation for desktop users.
- **NP Branding**:
  - `np-navy`: `#002F6C`
  - `np-gold`: `#F2A900`

---
*Built for Ngee Ann Polytechnic PROID Assignment.*
