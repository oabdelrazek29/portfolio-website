# About this folder

Next.js uses **`src/pages/`** only for the **legacy Pages Router** (file-based routes like `pages/index.tsx`).

This project uses the **App Router** (`src/app/`). The main SPA is composed in **`src/views/HomePage.tsx`** so we don’t conflict with Next’s routing rules.

If you prefer the name “pages” for your mental model, treat **`src/views/`** as your page-level compositions folder.
