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

## Production Build
To create an optimized production build:
```bash
npm run build
npm start
```

## Security & Best Practices
- Never expose `NEXT_PUBLIC_` variables unless they are safe for the client.
- Your `.env.local` and `service-account.json` must always remain safely ignored by `.gitignore`.

## License
&copy; 2026 JK Lakshmipat University. All rights reserved.
