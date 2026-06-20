# Chirag Verma — Portfolio Website

A premium, animated portfolio website built with **Next.js 15**, **Tailwind CSS 4**, **Framer Motion**, **MongoDB Atlas**, and **Nodemailer**.

---

## Local Setup

```bash
npm install
cp .env.example .env.local
# Fill in all values in .env.local
npm run dev
# Open http://localhost:3000
```

---

## MongoDB Atlas (Free Tier)

1. Go to cloud.mongodb.com → Create a free **M0 cluster**
2. Create a database user under **Security > Database Access**
3. Whitelist your IP (use `0.0.0.0/0` for Vercel)
4. Click **Connect > Drivers** → copy the connection string
5. Paste as `MONGODB_URI` in `.env.local`

Collections (`leads`, `pageviews`) are created automatically on first use.

---

## Gmail App Password

1. Go to myaccount.google.com/apppasswords
2. Select **Mail** → **Other** → name it "Portfolio"
3. Copy the 16-character password
4. Set `GMAIL_USER` + `GMAIL_APP_PASSWORD` in env

> 2FA must be enabled on your Google account.

---

## Vercel Deployment

```bash
npm i -g vercel
vercel
```

Add all env vars from `.env.example` in **Vercel Dashboard > Settings > Environment Variables**, then redeploy.

---

## Google Analytics 4

1. analytics.google.com → Create GA4 property
2. Copy **Measurement ID** (e.g. `G-XXXXXXXXXX`)
3. Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

---

## Microsoft Clarity

1. clarity.microsoft.com → Create project
2. Copy **Project ID**
3. Set `NEXT_PUBLIC_CLARITY_ID=your-id`

---

## Admin Panel

Visit `/admin/login` — password is `ADMIN_PASSWORD` env var.

- View all leads with full details
- Toggle status: New → Contacted → Closed
- See top pages and analytics links

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Database | MongoDB Atlas + Mongoose |
| Email | Nodemailer (Gmail SMTP) |
| Deployment | Vercel (free tier) |
