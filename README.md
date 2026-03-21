# Portfolio website

Velvet-purple, dark-first personal portfolio: **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**. Sections: hero, about, future roadmap, **GitHub projects** (live API or fallback grid), skills, resume, contact.

## Run locally

```bash
npm install
npm run dev
```

**Important:** use the URL Next.js prints in the terminal (usually `http://localhost:3000`). If port 3000 is already in use, Next picks another port (e.g. `3001`, `3003`) — opening the wrong port shows “page not available” or the wrong app.

### If the page won’t load

1. Read the **“Local:”** line after `npm run dev` and open **that** URL.
2. Free port 3000 if something else is stuck on it: `lsof -i :3000` then stop that process, or close other dev servers.
3. Reset the build cache: `rm -rf .next && npm run dev`

```bash
npm run build   # production build
npm run start   # run production server
```

## Push to GitHub

This folder is a **git** repo with `main` and an initial commit. `node_modules`, `.next`, and `.env` are ignored.

1. On [GitHub → New repository](https://github.com/new), create a repo (e.g. `portfolio-website`). **Do not** add a README, `.gitignore`, or license (this project already has them).
2. In the project directory, connect and push (replace `YOUR_USER` and `YOUR_REPO`):

```bash
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin main
```

If GitHub asks you to log in, use a [Personal Access Token](https://github.com/settings/tokens) as the password (HTTPS), or set up [SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) and use `git@github.com:YOUR_USER/YOUR_REPO.git` instead.

## Customize content

| What | Where |
|------|--------|
| Name, hero lines, about, email, GitHub, LinkedIn, resume URL | `src/data/portfolio.ts` → `siteConfig` |
| Future-project cards | `src/data/portfolio.ts` → `futureAmbitions[]` |
| Fallback projects (when GitHub has no data) | `src/data/portfolio.ts` → `projects[]` |
| Skill bubbles | `src/data/portfolio.ts` → `skills[]` |
| Glow / glass look | `src/app/globals.css` (after `@tailwind`) + `tailwind.config.ts` |

Look for comments marked **REPLACE** or **REPLACE THIS WITH YOUR PROJECT** in `portfolio.ts`.

### Images

- Local: add files under `public/` (e.g. `public/me.jpg`) and set paths like `"/me.jpg"`.
- Remote: add the hostname under `images.remotePatterns` in `next.config.ts`.

### GitHub project grid

Set **`githubUsername`** in `portfolio.ts`, or use a real **`githubUrl`** (username is parsed from `https://github.com/username`). The home page fetches public repos server-side (revalidates hourly). Forks are hidden. Optional: copy `.env.example` → `.env.local` and set **`GITHUB_TOKEN`** for a higher API rate limit.

### Contact form

The form is UI-only by default. In `src/components/sections/ContactSection.tsx`, replace the `handleSubmit` body with your API route, [Formspree](https://formspree.io), etc.

## Project structure

```
src/
  app/           # Next.js routes, layout, global CSS
  components/    # UI + layout + sections
  data/          # Editable portfolio content
  lib/           # GitHub fetch helper
  views/         # HomePage composition (SPA sections)
  styles/        # (optional) extra CSS — main theme lives in `app/globals.css`
assets/          # Optional originals (not served by Next)
public/assets/   # Static files served at /assets/...
```

**Why not `src/pages/`?** Next.js treats `pages/` as the [Pages Router](https://nextjs.org/docs/pages). Putting `HomePage` there makes Next expect route files. Use `views/` (or any other name) for composed page content when you use the App Router in `app/`.

## Stack

- React 19 / Next.js 15  
- Tailwind CSS 3  
- Framer Motion 11  
