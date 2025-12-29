# Project Setup Guide (Developer Onboarding)

Welcome to the **NP Archive** project! This guide will help you set up your local development environment.

## Prerequisites
- **Node.js**: Version 20 or higher is recommended (LTS).
- **Git**: For version control.
- **VS Code**: Recommended IDE (Install "Tailwind CSS IntelliSense" extension).

## Initial Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/np-archive.git
    cd np-archive
    ```

2.  **Install Dependencies**
    Run the following command in the root directory to install all required packages:
    ```bash
    npm install
    ```

## Development

1.  **Start Dev Server**
    ```bash
    npm run dev
    ```
    This will start the local server at `http://localhost:3000/`.

2.  **Project Structure**
    - `/src/features/scavenger-hunt`: Game logic, Dashboard, Clue Cards, etc.
    - `/src/components`: Reusable UI components (GlassPane, NavBar).
    - `/public`: Static assets (images, logos).

## Troubleshooting
- **Permission Errors (`EPERM`)**: If you see errors about "operation not permitted" in `.vite`, try deleting the `node_modules` folder and running `npm install` again. This often happens if OneDrive syncs the cache files.
- **Port Issues**: If the app loads an old cached version, try running `npx vite --port 3000` to force a new port.
