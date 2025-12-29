# Deployment Guide (GitHub Pages)

This project is configured to be easily deployed to GitHub Pages.

## Prerequisites
- A GitHub account.
- `git` installed on your machine.
- `npm` installed.

## Step 1: Initialize Git
If you haven't already initialized this folder as a git repository:

```bash
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Create Repository
1. Go to [GitHub.com](https://github.com) and create a new repository.
2. Name it `np-archive` (or your preferred name).
3. Do **not** initialize with README or .gitignore (since we have them).

## Step 3: Link Repository
Run the following commands in your terminal (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy
We use the `gh-pages` package to deploy the `dist` folder to a `gh-pages` branch.
Run this command in the root folder:
```bash
npm run deploy
```

This command will:
1. Build the project (`npm run build`).
2. Push the build to the `gh-pages` branch on GitHub.

## Step 5: Verify
1. On your GitHub repository page, go to **Settings > Pages**.
2. Ensure "Source" is set to **Deploy from a branch** and the branch is **gh-pages**.
3. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

## Troubleshooting
- **White Page / 404**: This app uses `HashRouter` and relative paths (`base: "./"`) to ensure compatibility with GitHub Pages subdirectories. If you see a blank page, check the Console (F12) for errors.
- **Permissions**: Ensure you have permission to push to the repository.
