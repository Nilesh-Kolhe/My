# Nilesh Kolhe — Personal Portfolio

A modern, responsive personal portfolio website built with React and Framer Motion. Live at [nileshkolhe.com](https://nileshkolhe.com).

---

## Sections

- **Hero** — Animated typewriter cycling through titles: Software Dev, AI Enthusiast, Tech Innovator
- **About** — Profile photo, personal bio, and skills overview
- **Experience** — Work history with collapsible detail view
- **My Work** — Featured projects with tech stack and links
- **Gallery** — Photography carousel with lightbox viewer
- **Contact** — Reach out form and social links

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Animations | Framer Motion 12 |
| Icons | React Icons 5 |
| Deployment | GitHub Pages via `gh-pages` |
| Hosting | Custom domain — nileshkolhe.com |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm start
```
Opens at [http://localhost:3000](http://localhost:3000).

### Build for production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```
Builds the app and pushes to the `gh-pages` branch. The site goes live at [nileshkolhe.com](https://nileshkolhe.com) within a few minutes.

---

## Project Structure

```
src/
├── assets/
│   ├── gallery/        # Photography section images
│   └── profile/        # About section profile photo
├── components/
│   ├── Navbar.js       # Responsive nav with mobile hamburger menu
│   ├── Hero.js         # Typewriter title animation
│   ├── About.js        # Bio and skills
│   ├── Experience.js   # Work history
│   ├── Projects.js     # Featured work
│   ├── Photography.js  # Image carousel with lightbox
│   ├── Contact.js      # Contact section
│   └── Footer.js       # Footer with social links
├── App.js
└── index.js
public/
└── CNAME               # Custom domain config for GitHub Pages
```

---

## Deployment Setup

The site is deployed to GitHub Pages with a custom domain:

1. `public/CNAME` contains `nileshkolhe.com`
2. `homepage` in `package.json` is set to `https://nileshkolhe.com`
3. GoDaddy DNS has four A records pointing to GitHub Pages IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. A `www` CNAME record points to `nilesh-kolhe.github.io`

---

## Browser Compatibility

Tested and working on:
- Chrome (desktop & Android)
- Safari (desktop & iPhone)
- Firefox
- Motorola Edge 60 Fusion (Android Chrome)

Safari-specific fixes applied for flexbox gallery rendering and `-webkit-backdrop-filter`.

---

## License

This project is personal and not open for reuse without permission.

&copy; 2026 Nilesh Kolhe. All rights reserved.
