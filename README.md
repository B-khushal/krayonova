# KrayoNova Website

KrayoNova is a Next.js frontend project deployed as a fully static site on Render.

## Tech Stack

- Next.js (App Router) with static export
- React + TypeScript
- EmailJS browser SDK for contact email delivery (no backend server)

## Local Development

```bash
npm install
npm run dev
```

## Static Production Build

```bash
npm install
npm run build
```

The build produces static files in `dist/` (copied from Next.js `out/`).

## EmailJS Setup

KrayoNova sends Contact Us and Get a Quote submissions directly from the frontend using EmailJS.

### 1. Create an EmailJS account

1. Go to https://www.emailjs.com/ and sign up.
2. Verify your email and open the EmailJS dashboard.

### 2. Create an Email Service

1. Open **Email Services** in EmailJS.
2. Add your provider (Gmail, Outlook, etc.).
3. Copy the generated **Service ID**.

### 3. Create an Email Template

1. Open **Email Templates**.
2. Create a template for form submissions.
3. Include template variables such as:
   - `from_name`
   - `from_email`
   - `phone`
   - `company`
   - `project_type`
   - `budget`
   - `timeline`
   - `message`
4. Copy the generated **Template ID**.

### 4. Get the Public Key

1. Open **Account** -> **API Keys**.
2. Copy the **Public Key**.

### 5. Configure environment variables

Add the following values to your local `.env.local` and to Render environment variables:

```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

Notes:
- These values are injected at build time for client-side EmailJS usage.
- Do not add private email account credentials in frontend environment variables.
- Only the EmailJS public key is used on the client at runtime.

## Render Static Site Deployment

Use Render **Static Site** (not Web Service):

- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Rewrite Rule: `/*` -> `/index.html` (type: Rewrite)

These settings are already defined in `render.yaml`.

## Form Behavior

Both forms now submit directly with EmailJS:

- Contact Us form
- Get a Quote form

Captured fields include:

- Name
- Email
- Phone
- Company (optional)
- Message / Project details

The UI shows:

- Success confirmation after send
- Error message when send fails
