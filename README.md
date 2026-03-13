# KrayoNova Website

KrayoNova is a Next.js frontend-only website configured for static hosting.

## Framework

This project uses Next.js (App Router) with static export enabled.

## Local Development

```bash
npm install
npm run dev
```

## Production Static Build

```bash
npm install
npm run build
npm run export
```

Build output is generated in `out/`.

## Render Static Site Deployment

KrayoNova is deployed as a **Render Static Site** (not a Web Service).

### Render settings

- Service Type: `Static Site`
- Build Command: `npm install && npm run build && npm run export`
- Publish Directory: `out`

### SPA fallback rule

Add a rewrite rule so all routes resolve to the static entry:

- Source: `/*`
- Destination: `/index.html`
- Type: `Rewrite`

If you use `render.yaml`, these settings are already declared there.

## Notes

- There is no backend server runtime.
- There are no server start commands required for deployment.
- Contact forms use client-side email composition (`mailto:`) compatible with static hosting.
