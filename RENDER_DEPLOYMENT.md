# KrayoNova Render Deployment (Static Site)

This project is configured for **Render Static Site** hosting.

## 1. Service type

Create or convert the service to:

- `Static Site`

Do not use `Web Service` for this project.

## 2. Build and publish configuration

Use the Next.js static export workflow:

- Build Command: `npm install && npm run build && npm run export`
- Publish Directory: `out`

## 3. Routing fallback for SPA behavior

Add this rewrite rule in Render:

- Type: `Rewrite`
- Source: `/*`
- Destination: `/index.html`

This ensures deep links and client-side routing continue to work.

## 4. Auto configuration with render.yaml

This repository includes `render.yaml` with static-site settings:

- `type: static_site`
- `buildCommand: npm install && npm run build && npm run export`
- `staticPublishPath: out`
- Rewrite route to `/index.html`

## 5. Verify build output before pushing

Run locally:

```bash
npm install
npm run build
npm run export
```

Confirm `out/` exists and contains files such as:

- `out/index.html`
- `out/_next/...` assets

## 6. Deploy

```bash
git add .
git commit -m "Configure Render Static Site deployment"
git push origin main
```

Render will build and publish the static output from `out/`.
