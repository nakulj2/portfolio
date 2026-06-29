# Portfolio

Minimal personal site built with React + Vite. Deployed via GitHub Actions to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Push this repo to `github.com/nakulj2/portfolio` on the `main` branch.
2. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` will build and deploy automatically.
4. Your site will be live at `https://nakulj2.github.io/portfolio/`.

## Before you deploy

Update the placeholder links in `src/App.jsx` (the `LINKS` array):
- Email
- GitHub
- LinkedIn

## Custom domain (optional)

If you later buy a custom domain, add a `public/CNAME` file containing just the domain name, and update DNS per GitHub's custom domain docs. No code changes needed.
