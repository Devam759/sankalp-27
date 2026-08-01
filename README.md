# SANKALP '27 — International Conference Web Portal

Official web application for **SANKALP '27** — *International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction*, hosted by the Institute of Engineering & Technology (IET), JK Lakshmipat University (JKLU), Jaipur, India.

- **Production Domain**: [sankalp.jklu.edu.in](https://sankalp.jklu.edu.in)
- **Institution**: JK Lakshmipat University, Jaipur, Rajasthan, India

---

## Technical Overview

The application is built using Next.js 16 (App Router) and Tailwind CSS v4, adhering to strict SEO standards, accessibility guidelines, and performance practices.

### Core Capabilities

- **High-Performance Architecture**: Full SSR/SSG pre-rendering optimized for Core Web Vitals, achieving 100/100 Accessibility, 100/100 Best Practices, and 100/100 SEO on Google PageSpeed Insights.
- **Payment Gateway Integration**: Cashfree PG integration supporting UPI, Credit/Debit Cards, Net Banking, and Wallets with automated server-side webhook verification and promotional coupon processing.
- **Automated Ticketing System**: Dynamic PDF registration receipt generation with embedded QR check-in passes built using `pdf-lib` and `qrcode`.
- **Email Dispatch Engine**: Integrated Nodemailer transport over Office 365 SMTP (`sankalp@jklu.edu.in`) for automated registration ticket delivery and system notifications.
- **Verification Web Application**: Dedicated mobile-optimized QR scanner module (`/scanner`) enabling staff to verify attendee passes and record check-ins in real time.
- **Administration Suite**: Protected management console (`/admin`) for registration tracking, coupon configuration, attendance analytics, audit logging, and Google Sheets synchronization.
- **Submission Routing**: External routing for research paper submissions via Microsoft CMT.

---

## Technology Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Backend & Database** | Google Firestore, Firebase Admin SDK, Firebase Auth |
| **Payment Processing** | Cashfree PG SDK (`@cashfreepayments/cashfree-js`), Webhooks |
| **Email Infrastructure** | Nodemailer (Office 365 SMTP `smtp.office365.com:587`) |
| **PDF & Code Generation** | `pdf-lib`, `qrcode` |
| **Deployment Platform** | Vercel Serverless Architecture |

---

## Project Structure

```
conference-portal/
├── app/                        # Next.js App Router routes and layouts
│   ├── admin/                  # Administrative management portal
│   ├── api/                    # Serverless API endpoints
│   ├── scanner/                # Volunteer QR code scanning interface
│   ├── layout.tsx              # Root layout with preloads and JSON-LD schemas
│   ├── robots.ts               # Search engine crawler configuration
│   └── sitemap.ts              # XML sitemap generator
├── components/                 # UI components and layout elements
│   ├── ui/                     # Navigation, Footer, Section, Accordions
│   ├── home/                   # Homepage client component (HomeClient.tsx)
│   ├── admin/                  # Administrative tables, charts, and controls
│   ├── scanner/                # QR scanner session and sidebar components
│   ├── sections/               # Page section components
│   └── seo/                    # JSON-LD structured data helpers
├── constants/                  # Application constants and configuration data
│   ├── conferenceData.ts       # Dates, tracks, speakers, and external links
│   └── fees.ts                 # Registration categories and pricing structures
├── lib/                        # Backend helpers and service initializers
│   ├── firebaseAdmin.ts        # Firebase Admin SDK configuration
│   ├── registrationHelper.ts   # Registration, PDF pass generation, and email dispatch
│   └── batchHelper.ts          # Student batch assignment and check-in emails
├── docs/                       # Project documentation
│   ├── PROJECT_CONTEXT.md      # Full architecture reference for AI agents
│   ├── DEMO_DATA_SUMMARY.txt   # Placeholder data checklist
│   ├── SITE_REQUIREMENTS.txt   # Production asset requirements
│   └── SECURITY.md             # Security guidelines and secrets management
├── scripts/                    # Operational and maintenance scripts
├── public/                     # Static media assets, logos, and fonts
└── proxy.ts                    # Next.js 16 edge proxy: rate limiting, HTTPS, security headers
```

---

## Development Setup

### Prerequisites

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- Firebase Project with Firestore enabled
- Cashfree Merchant API credentials

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Devam759/sankalp-27.git
   cd sankalp-27
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   # Application Domain Settings
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   NEXT_PUBLIC_CASHFREE_ENV="TEST"

   # Firebase Credentials
   FIREBASE_PROJECT_ID="sankalp-27"
   FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@sankalp-27.iam.gserviceaccount.com"
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # Cashfree Payment Gateway Credentials
   CASHFREE_APP_ID="your_cashfree_app_id"
   CASHFREE_SECRET_KEY="your_cashfree_secret_key"

   # SMTP Dispatch Settings
   SMTP_HOST="smtp.office365.com"
   SMTP_PORT="587"
   SMTP_SECURE="false"
   SMTP_USER="sankalp@jklu.edu.in"
   SMTP_PASS="your_office365_app_password"
   SMTP_FROM="SANKALP 2027 Secretariat <sankalp@jklu.edu.in>"
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

---

## Production Deployment

The application is deployed on Vercel and mapped to `sankalp.jklu.edu.in`.

### Build Commands

```bash
# Type check TypeScript codebase
npx tsc --noEmit

# Execute production build
npm run build
```

---

## Copyright & License

Copyright &copy; 2027 **JK Lakshmipat University**. All Rights Reserved.  
*Institute of Engineering & Technology, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India.*
