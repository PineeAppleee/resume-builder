# Deployment Guide: ResumeCanvas Pro

To ensure your Vercel deployment looks and functions **exactly** like localhost, you must configure the following Environment Variables in your Vercel Project Settings.

## 1. Environment Variables (Required)

Go to **Vercel Dashboard** > **Settings** > **Environment Variables** and add:

| Variable | Value (Example) | Purpose |
|----------|-----------------|---------|
| `OPENROUTER_API_KEY` | `sk-or-v1-...` | Critical for AI features to work. |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Required for Auth (use your actual Vercel domain). |
| `NEXTAUTH_SECRET` | `(generate using openssl rand -base64 32)` | Security for sessions. |
| `MONGODB_URI` | `mongodb+srv://...` | Database connection. |

> **Note:** If `OPENROUTER_API_KEY` is missing, the AI Assistant will fail or return empty responses, making the app look "different" or broken.

## 2. Build Settings

Your `next.config.ts` is already configured to ignore strict linting errors during build, ensuring a smooth deployment.
- **Build Command**: `next build`
- **Output Directory**: `.next` (Standard)

## 3. Post-Deployment Check

After deployment, check the **Function Logs** in Vercel if you see any 500 errors.
