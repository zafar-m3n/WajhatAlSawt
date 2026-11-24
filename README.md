# Wajhat Al Sawt

Marketing site for Wajhat Al Sawt (wajhatalsawt.com).

React 19 + Vite + Tailwind CSS v4, React Router, Iconify, react-select, motion.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the build
npm run meta     # regenerate public/sitemap.xml and IMAGES.md
```

## Structure

- `src/pages/` – one file per page/template (service and industry pages are data-driven)
- `src/components/layout/` – header (menus), footer, closing CTA band
- `src/components/ui/` – Button, Photo (image/placeholder), Accordion, Select (react-select), Seo
- `src/data/` – all site content; `catalog.js` is the lightweight index used by menus
- Imports use the `@/` alias for `src/`

## Images

Every image is a placeholder until a file is added. See **IMAGES.md** for file names, sizes and
Freepik keywords; drop JPGs into `public/images/` and they replace the placeholders automatically.

## Contact form

The contact form and newsletter validate input but are not connected to any service yet.
Wire them up in `src/pages/Contact.jsx` and `src/pages/Blog.jsx`.

## Deploying on AWS Amplify

`amplify.yml` holds the build settings. Because this is a single-page app, add this rewrite in
Amplify Console → Hosting → Rewrites and redirects:

| Source | Target | Type |
|---|---|---|
| `</^[^.]+$\|\.(?!(css\|gif\|ico\|jpg\|jpeg\|js\|png\|txt\|svg\|woff\|woff2\|ttf\|map\|json\|xml\|webp)$)([^.]+$)/>` | `/index.html` | 200 (Rewrite) |
