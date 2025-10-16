# README

## Project name

**Company Website** — React-based company website (single-page app with static/public pages).

---

# Table of contents

1. [Project summary](#project-summary)
2. [Prerequisites](#prerequisites)
3. [Quick start — install & run locally](#quick-start)
4. [Available scripts](#available-scripts)
5. [Folder structure (explained)](#folder-structure-explained)
6. [Configuration / environment variables](#configuration--environment-variables)
7. [Build & deploy](#build--deploy)
8. [Code style & tools](#code-style--tools)
9. [Useful troubleshooting tips](#useful-troubleshooting-tips)
10. [Contacts & license](#contacts--license)


---

# Project summary

This repository contains the source for the company website. The app is a React codebase (JSX + CSS Modules) with a `public/` folder containing static HTML assets (SEO pages, static site fallbacks). The site integrates images, forms, components, and a number of page sections (About, Careers, Contact, Teams, Services, etc.).

---

# Prerequisites

* npm or yarn (npm ≥ 8 recommended)

---

# Quick start

```bash
# clone repo
git clone <repo-url>
cd <repo-folder>

# install dependencies
npm install
# or
yarn

# run dev server
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) (default CRA port) — or the port configured in your env.

---

# Available scripts

(If you use Create React App or similar — adapt as needed)

```bash
npm start        # start dev server (hot reload)
npm run build    # production build -> outputs to `build/` or `dist/`
```

Add these scripts to `package.json` if missing.

---

# Folder structure (explained)

Follow the structure visible in the repository. Key folders and files:

```
/public
  ├─ css/                   # static css used by static html pages
  ├─ img/                   # public images
  ├─ js/                    # plain js used in public pages (optional)
  ├─ index.html             # main static html template (used by dev server / build)
  ├─ about.html, careers.html, contact.html, teams.html, services.html #HTML files created for Deployment( To avoid Crawling error )
  └─ 404.html

/src
  ├─ components/
  │   ├─ about.jsx
  │   ├─ AboutUs.module.css
  │   ├─ contact.jsx
  │   ├─ Contact.module.css
  │   ├─ header.jsx
  │   ├─ Header.module.css
  │   ├─ LottieFlow.jsx
  │   ├─ LottieFlow.module.css
  │   ├─ MapSection.module.css
  │   ├─ navigation.jsx
  │   ├─ projects.jsx
  │   ├─ services.jsx
  │   ├─ Teams.jsx
  │   └─ ... (other components)
  ├─ sections/
  │   ├─ careers.js
  │   ├─ jobdetail.js
  │   └─ medical.js
  ├─ data/                   # site data / JSON used by components
  ├─ font/                   # custom webfonts (local)
  ├─ img/                    # images imported by React components
  ├─ map image/              # map assets used by Map components
  ├─ App.jsx
  ├─ index.jsx
  ├─ index.css
  └─ main.module.css
```

**Notes about important files / conventions:**

* CSS Modules are used (e.g. `*.module.css`) for component-scoped styles.
* `App.jsx` and `index.jsx` are the application entrypoints.
* `public/` contains static HTML pages for crawlers or standalone pages (e.g., `careers.html`). These are served directly by static hosts.

---

# Configuration / environment variables


Add `.env` to `.gitignore` if not already present.

---

# Build & deploy

1. Create a production build:

   ```bash
   npm run build
   ```

   Output (by default) is in `build/` or `dist/`.

2. Deploy options:

   * **Netlify / Vercel**: connect repo, specify build command `npm run build`, and publish directory `build`.
   * **GitHub Pages**: use `gh-pages` package or put static pages from `public/`.
   * **Static server**: `serve -s build` to preview locally.
   * **IIS / Azure / Apache**: copy production files from `build/` and configure server to serve `index.html` for client-side routing.

**Important:** If you have SEO static pages in `public/` (e.g., `careers.html`, `index.html`), confirm your deploy picks up `public/` contents (most static hosts do).

---


# Code style & tools

* JavaScript/JSX: ESLint (Airbnb or recommended config)
* Formatting: Prettier (run `npm run format`)
* CSS: use CSS Modules (`*.module.css`) for component styles; global styles in `index.css`
* Tests: use Jest + React Testing Library (optional / recommended)
* Lint & format hooks: use Husky + lint-staged to auto-run pre-commit.

Example dev-dependencies:

```json
"devDependencies": {
  "eslint": "...",
  "prettier": "...",
  "husky": "...",
  "lint-staged": "..."
}
```

---

# Useful troubleshooting tips

* If styles are not applied, check that CSS modules are imported like:

  ```js
  import styles from './AboutUs.module.css';
  <div className={styles.wrapper}>...</div>
  ```
* If images don't load in production, ensure assets are referenced from `/public` or imported into React.
* If client-side routes 404 on refresh, configure the server to fallback to `index.html` (single-page-app rewrite).
  
---

# .gitignore (suggested)

```
node_modules/
build/
.env
.DS_Store
.vscode/
npm-debug.log*
yarn-error.log*
```

---

# Security / secrets

* Never commit `.env` with tokens/keys.
* Rotate API keys if accidentally committed.
* Use host environment variable settings (Netlify / Vercel / Azure App Settings) rather than committing secrets.

---

# Contacts & license

* Project owner / maintainer: *Ace Keystone Consultants* 
* For urgent issues, create a GitHub issue with label `urgent`.
* License: add `LICENSE` file (e.g., MIT) — replace with your chosen license.

---



