# Sankalp '27 International Conference Website

This repository contains the source code for the **Sankalp 2027 International Conference** at JK Lakshmipat University, Jaipur.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Database / Auth / Storage**: Firebase (Web & Admin SDKs)
- **Payments**: Cashfree PG
- **Other Tools**: PDF-lib (Dynamic Ticket Generation), Nodemailer (Automated Emails), GSAP / Framer Motion (Animations)

## Prerequisites
- Node.js >= 18.x
- Firebase Project with Firestore and Storage enabled
- Cashfree Merchant Account

## Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sankalp-27.git
   cd sankalp-27
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Copy the `.env.example` file to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in your actual Firebase, Cashfree, and SMTP keys inside `.env.local`. **Never commit this file to version control.**

4. **Service Account Key (For Firebase Admin):**
   - Download your Firebase Admin `serviceAccountKey.json` from the Firebase Console (Project Settings > Service Accounts > Generate new private key).
   - Place `service-account.json` at the root of the project (this file is excluded from Git via `.gitignore`).

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Production Build & Deployment (Vercel)
This project is configured to be hosted on **Vercel** while keeping the database, authentication, and storage managed by **Firebase**.

### Deploying to Vercel
1. Import your GitHub repository into your Vercel Dashboard.
2. Under **Environment Variables**, add all the variables from your `.env.local` file.
3. **Important for Firebase Admin**: Since `service-account.json` is not committed to GitHub, you must encode its contents and add it as an environment variable in Vercel:
   - Create an environment variable named `FIREBASE_SERVICE_ACCOUNT`.
   - Paste the **entire JSON string** of your `service-account.json` file into the value field. The backend will automatically parse this JSON string to initialize the Firebase Admin SDK securely.
4. Click **Deploy**. Vercel will automatically detect the Next.js framework, run `npm run build`, and host your site globally!

## Security & Best Practices
- Never expose `NEXT_PUBLIC_` variables unless they are safe for the client.
- Your `.env.local` and `service-account.json` must always remain safely ignored by `.gitignore`.

## License
&copy; 2026 JK Lakshmipat University. All rights reserved.
