# PROJECT_CONTEXT.md

> **Auto-generated comprehensive reference for AI agents.**
> This file describes the full architecture, conventions, data models, security model, and working patterns of this codebase. Read this before making any changes.

---

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| **Name** | JKLU SANKALP 2027 - International Conference Portal |
| **Organizer** | JK Lakshmipat University (JKLU), Jaipur, India |
| **Event** | JKLU SANKALP 2027 International Conference (5-6 March 2027) |
| **Production URL** | `https://sankalp.jklu.edu.in` |
| **Domain** | `sankalp.jklu.edu.in` |
| **Repository** | `sankalp-27` (GitHub) |

---

## 2. PURPOSE & SCOPE

This is the **full-stack conference management platform** covering:

1. **Public-facing website** - Home, About, Venue, Sponsors, Call for Papers, Registration, FAQ, Contact, Committee, Terms, Privacy, Refund, Shipping Policy pages.
2. **Registration + Payment** - Online registration with Cashfree PG integration, PDF receipt generation, automated email dispatch.
3. **Admin Dashboard** - At `/admin` - manages registrations, check-ins, scanner accounts, coupons, announcements, events, errors, audit logs, entry logs, settlement reconciliation, Google Sheets sync, and email resend.
4. **Scanner Dashboard** - At `/scanner` - QR-code-based ticket validation for on-site check-in desks.
5. **Check-in System** - At `/check-in` - gate-level digital check-in with batch assignment and confirmation emails.

---

## 3. TECH STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^16.2.10 |
| Language | TypeScript | ^6.0.3 |
| UI Library | React | ^19.2.7 |
| Styling | Tailwind CSS v4 | ^4.3.2 |
| CSS Engine | PostCSS + `@tailwindcss/postcss` | ^8.5.16 |
| Animations | Framer Motion, GSAP | ^12.42.2 / ^3.15.0 |
| Database | Firebase Firestore (Web SDK + Admin SDK) | firebase ^12.15.0 / firebase-admin ^14.1.0 |
| Auth | Firebase Authentication (email/password) | Same SDK |
| Storage | Firebase Storage | Same SDK |
| App Check | Firebase App Check (ReCaptcha v3) | Same SDK |
| Payments | Cashfree Payment Gateway | cashfree-pg ^6.0.4 / @cashfreepayments/cashfree-js ^1.0.7 |
| PDF Generation | pdf-lib | ^1.17.1 |
| QR Code | qrcode (Node), qrcode.react (Client), html5-qrcode (Scanner) | Various |
| Email | Nodemailer (SMTP via Office 365) | ^9.0.3 |
| Analytics | Vercel Analytics + Speed Insights | ^2.0.1 |
| Spreadsheet Sync | Google Apps Script Webhook (EXCEL_SYNC_WEBHOOK_URL) | External |
| Hosting | Vercel (frontend + API routes) | - |
| Module System | ESM (`"type": "module"`) | - |
| Node.js | ≥ 18.x | - |

---

## 4. DIRECTORY STRUCTURE

```
conference-portal/
├── app/                        # Next.js App Router pages + API routes
│   ├── layout.tsx              # Root layout (fonts via next/font, metadata, analytics)
│   ├── page.tsx                # Homepage server component (metadata + JSON-LD)
│   ├── template.tsx            # Page transition wrapper
│   ├── globals.css             # Global styles, Tailwind v4 @theme, custom utilities
│   ├── error.tsx               # Global error boundary
│   ├── robots.ts               # SEO: robots.txt
│   ├── sitemap.ts              # SEO: sitemap.xml
│   │
│   ├── about/page.tsx          # About the conference
│   ├── venue/page.tsx          # Venue & accommodation
│   ├── sponsors/page.tsx       # Sponsors & partnerships
│   ├── call-for-papers/page.tsx # Tracks, submission steps
│   ├── registration/page.tsx   # Public registration form + Cashfree checkout
│   ├── committee/page.tsx      # Committee, advisory board, TPC
│   ├── faq/page.tsx            # FAQ
│   ├── contact/page.tsx        # Contact form
│   ├── terms-and-conditions/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── refund-policy/page.tsx
│   ├── shipping-policy/page.tsx
│   │
│   ├── login/                  # Auth portal (login, password reset, email verify)
│   │   ├── page.tsx
│   │   └── layout.tsx
│   │
│   ├── admin/                  # Admin dashboard (protected)
│   │   ├── layout.tsx          # Admin layout wrapper + auth guard
│   │   ├── page.tsx            # Dashboard overview (stats)
│   │   ├── registrations/page.tsx
│   │   ├── search/page.tsx
│   │   ├── coupons/page.tsx
│   │   ├── scanner/page.tsx    # Scanner account management
│   │   ├── scanner-accounts/page.tsx
│   │   ├── events/page.tsx
│   │   ├── announcements/page.tsx
│   │   ├── entry-logs/page.tsx
│   │   ├── audit/page.tsx
│   │   └── errors/page.tsx
│   │
│   ├── scanner/                # QR scanner dashboard (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Live QR scanner
│   │   └── records/page.tsx    # Scan history
│   │
│   ├── check-in/page.tsx       # Gate check-in interface
│   │
│   └── api/                    # Server-side API routes
│       ├── register/route.ts       # Registration: coupon verify, pincode, order create, payment verify
│       ├── webhook/route.ts        # Cashfree webhook (payment.success, settlement.success)
│       ├── receipt/route.ts        # PDF receipt download (admin-only)
│       ├── contact/route.ts        # Contact form submission
│       ├── log-error/route.ts      # Frontend error logging
│       ├── indexnow/route.ts       # IndexNow URL submission trigger
│       ├── check-in/approve/route.ts  # Gate check-in approval
│       └── admin/
│           ├── sync-sheet/route.ts     # Manual Google Sheets sync
│           ├── resend-emails/route.ts  # Manual email resend
│           └── reconcile-settlements/route.ts  # Settlement reconciliation (manual + cron)
│
├── components/
│   ├── ui/                     # Shared UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Section.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Icons.tsx
│   │   ├── CircuitChipLoader.tsx
│   │   ├── GearboxLoader.tsx
│   │   └── TrackAccordion.tsx
│   ├── home/                   # Homepage-specific large client component
│   │   └── HomeClient.tsx      # Homepage interactive client component (47KB)
│   ├── admin/                  # Admin-specific components
│   │   ├── AdminLayoutWrapper.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── Modal.tsx
│   │   └── SkeletonLoader.tsx
│   ├── scanner/                # Scanner-specific components
│   │   ├── ScannerSidebar.tsx
│   │   └── ScannerSessionProvider.tsx
│   ├── sections/               # Page section components
│   │   └── ConferencePillars.tsx
│   └── seo/
│       └── JsonLd.tsx          # JSON-LD structured data helper
│
├── lib/                        # Core business logic and utilities
│   ├── firebase.ts             # Client-side Firebase init (App, Auth, Firestore, Storage, App Check, Analytics)
│   ├── firebaseAdmin.ts        # Server-side Firebase Admin SDK init
│   ├── serverAuth.ts           # Bearer token verification + role checking
│   ├── security.ts             # Rate limiting, input sanitization, Cashfree signature verification, phone/email helpers
│   ├── db.ts                   # Client-side Firestore CRUD helpers
│   ├── audit.ts                # Client-side audit logging
│   ├── registrationHelper.ts   # PDF generation, SMTP email, registration finalization pipeline
│   ├── batchHelper.ts          # Student batch assignment + check-in email
│   ├── utils.ts                # cn() utility, registration number formatting
│   └── sounds.ts               # Web Audio API retro sound effects
│
├── constants/
│   ├── conferenceData.ts       # All conference data (dates, tracks, speakers, committee, fees, advisory board)
│   └── fees.ts                 # Registration categories with pricing
│
├── docs/                       # Project documentation (AI context, requirements, security notes)
│   ├── PROJECT_CONTEXT.md      # This file - full architecture reference for AI agents
│   ├── DEMO_DATA_SUMMARY.txt   # Checklist of placeholder/mock data to replace before launch
│   ├── SITE_REQUIREMENTS.txt   # Production asset requirements checklist
│   └── SECURITY.md             # Security guidelines and secrets management
│
├── scripts/                    # Operational one-off scripts (reconciliation, audit, SMTP tests)
├── public/                     # Static assets (images, logos, fonts)
├── proxy.ts                    # Next.js 16 edge proxy/middleware (HTTPS redirect, rate limiting, security headers)
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Firestore composite indexes
├── storage.rules               # Firebase Storage rules
├── firebase.json               # Firebase project config
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.mjs
└── .env.example                # Environment variable template
```

---

## 5. ENVIRONMENT VARIABLES

### Client-side (safe to expose, prefixed `NEXT_PUBLIC_`)
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web App API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |
| `NEXT_PUBLIC_CASHFREE_ENV` | `SANDBOX` or `PRODUCTION` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | ReCaptcha v3 site key (App Check) |

### Server-side only (NEVER expose to client)
| Variable | Purpose |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Admin SDK credential (JSON string or base64-encoded) |
| `CASHFREE_APP_ID` | Cashfree PG App ID |
| `CASHFREE_SECRET_KEY` | Cashfree PG Secret Key |
| `SMTP_HOST` | SMTP server host (default: `smtp.office365.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Sender email address |
| `EXCEL_SYNC_WEBHOOK_URL` | Google Apps Script URL for Sheets sync |
| `ALLOWED_TEST_COUPONS` | Comma-separated test coupon codes (reduce to Rs. 1) |
| `CRON_SECRET` | Token for securing automated cron endpoints |
| `RECAPTCHA_SECRET_KEY` | ReCaptcha v3 secret key |

---

## 6. FIRESTORE DATA MODEL

### Collections

| Collection | Description | Client Access | Admin SDK Access |
|---|---|---|---|
| `registrations` | Confirmed registrations | Read: admin/scanner only; **Create: DISALLOWED client-side** | Full |
| `pendingRegistrations` | Temporary order data awaiting payment | No client access | Full |
| `registrationLocks` | Atomic lock docs to prevent duplicate registrations | No client access | Create-only |
| `backgroundTaskLocks` | Ensures email/sheet sync runs exactly once per order | No client access | Create-only |
| `roles` | User role assignments (`admin`, `scanner`) | Read: own UID only | Full |
| `scanLogs` | QR scan event log | Read/Write: admin/scanner | Full |
| `auditLogs` | System audit trail | Create: any auth'd user; Read/Update/Delete: admin only | Full |
| `notifications` | Admin-managed notifications | Read: any auth'd user | Full |
| `announcements` | Public announcements | Read: anyone; Write: admin only | Full |
| `events` | Conference schedule events | Read: anyone; Write: admin only | Full |
| `settings` | App configuration (e.g., settlementReconciler toggle) | Read: anyone; Write: admin only | Full |
| `scannerAccounts` | Scanner user accounts | Read: own UID or admin | Full |
| `coupons` | Discount coupon definitions | Admin only | Full |
| `contact_messages` | Contact form submissions | Create: anonymous allowed | Full |
| `studentBatches` | Student batch assignments | No client access | Full |

### Registration Document Fields
```
name, email, phone, affiliation, country, category, paperId, paperTitle,
needAccommodation, pincode, region, city, paymentAmount, receivedAmount,
dateOfPayment, dateGroup, hasEntered, enteredAt, enteredBy, paymentId,
orderId, settlementId, sheetSynced, sheetSyncedAt, emailSent, emailSentAt,
emailError, registeredAt, assignedBatch, assignedBatchPdf
```

### Role System
- Roles are stored in `roles/{uid}` document with a `role` field.
- Valid roles: `admin`, `scanner`.
- Checked server-side via `lib/serverAuth.ts` (`verifyAuthRole`).
- Checked client-side via Firestore rules (`getRole()` helper).

---

## 7. AUTHENTICATION & AUTHORIZATION

### Login Flow
1. User submits email/password on `/login`.
2. Firebase Auth `signInWithEmailAndPassword` is called client-side.
3. On success, `auth.currentUser.uid` is used to fetch `roles/{uid}` from Firestore.
4. Based on role:
   - `admin` → redirect to `/admin`
   - `scanner` → redirect to `/scanner`
5. Unverified emails are rejected; user is signed out and prompted to verify.

### API Route Protection
- All admin/scanner API routes call `verifyAuthRole(req, ['admin'])` or `verifyAuthRole(req, ['admin', 'scanner'])`.
- Extracts `Bearer` token from `Authorization` header.
- Verifies via `adminAuth.verifyIdToken(token)`.
- Fetches role from `roles/{uid}` collection.
- Rejects if role not in `allowedRoles`.

### Firestore Security Rules
- `registrations`: client create is `false` (Admin SDK only).
- `pendingRegistrations`: all client access is `false`.
- `auditLogs`: create requires authentication; read/write is admin-only.
- `roles`: read is own-doc only; write is admin-only.

---

## 8. REGISTRATION & PAYMENT FLOW

### Step-by-step
1. **Client** fills registration form → calls `POST /api/register` with `action: 'CREATE_ORDER'`.
2. **Server** validates category, coupon, creates `pendingRegistrations/{orderId}` doc, creates Cashfree order.
3. **Client** receives `payment_session_id`, opens Cashfree checkout via `@cashfreepayments/cashfree-js`.
4. **Payment completes** → two parallel paths:
   - **Webhook** (`POST /api/webhook`): Cashfree sends `payment.success` event → server verifies signature → calls `finalizeRegistration()`.
   - **Client polling** (`action: 'VERIFY_PAYMENT'`): Client calls `/api/register` → server verifies via Cashfree API → calls `finalizeRegistration()`.
5. **`finalizeRegistration()`** (in `lib/registrationHelper.ts`):
   - Acquires atomic lock via `registrationLocks` collection.
   - Writes to `registrations` collection.
   - If not skipped: acquires `backgroundTaskLocks`, generates PDF receipt, sends email via SMTP, logs audit event.
6. **Duplicate prevention**: `registrationLocks` + `backgroundTaskLocks` ensure idempotent processing even when both webhook and client verification fire.

### Coupon System
- Coupons stored in `coupons/{CODE}` Firestore collection.
- Fields: `active: boolean`, `discountPercentage?: number`, `amount?: number`.
- 100% discount coupons result in Rs. 0 payment (mock mode).

### Registration Categories (from `constants/fees.ts`)
| ID | Name | Amount (INR) |
|---|---|---|
| `student_presenter` | Student / Research Scholar | 1,500 |
| `academic_presenter` | Academician | 3,000 |
| `industry_presenter` | Industry Professional | 5,000 |
| `attendee` | Attendee / Non-Presenter | 1,000 |
| `foreign_delegate` | Foreign Delegate | 8,000 |

---

## 9. API ROUTES REFERENCE

| Method | Route | Auth | Rate Limit | Purpose |
|---|---|---|---|---|
| `POST` | `/api/register` | None | 5/min/IP | Registration (coupon verify, pincode lookup, order create, payment verify) |
| `POST` | `/api/webhook` | Cashfree signature | 60/min/IP | Cashfree webhook (payment.success, settlement.success) |
| `GET` | `/api/receipt?id=` | Admin | 10/min/IP | Download PDF receipt |
| `POST` | `/api/contact` | None | 3/min/IP | Contact form submission |
| `POST` | `/api/log-error` | None | - | Frontend error logging |
| `POST` | `/api/check-in/approve` | Admin/Scanner | - | Gate check-in approval |
| `POST` | `/api/admin/sync-sheet` | Admin | - | Sync registrations to Google Sheets |
| `POST` | `/api/admin/resend-emails` | Admin | - | Resend confirmation emails |
| `POST/GET` | `/api/admin/reconcile-settlements` | Admin / Cron token | - | Reconcile payment settlements |

---

## 10. SECURITY ARCHITECTURE

### Rate Limiting
1. **Edge middleware** (`proxy.ts`): 60 req/min global API, 10/min register, 15/min login per IP.
2. **API-level** (`lib/security.ts`): In-memory per-IP rate limiting with auto-pruning.

### Input Sanitization
- `sanitizeObject()` / `sanitizeInput()` in `lib/security.ts`: strips HTML tags, escapes `&" '`.
- Applied to all API request bodies before processing.
- Phone numbers normalized via `formatPhoneNumber()` to `+91 XXXXXXXXXX`.

### Payment Security
- Cashfree webhook signature verification via HMAC-SHA256 (`verifyCashfreeSignature`).
- `crypto.timingSafeEqual` prevents timing side-channel attacks.
- orderId format validated with regex before Firestore use.
- Host header injection prevention in order creation.

### HTTP Security Headers (via `next.config.mjs`)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Permissions-Policy: camera=(self), geolocation=(), microphone=()`
- CSP: restricts scripts, connections, frames to known domains.

### HTTPS Enforcement
- `proxy.ts` middleware redirects HTTP → HTTPS in production.

### PII Protection
- `maskEmail()` for logging (`d***m@gmail.com`).
- Production logs use masked emails.

---

## 11. EMAIL SYSTEM

### Transport
- Nodemailer with Office 365 SMTP (`smtp.office365.com:587`, STARTTLS).
- Connection pooling (3 connections, 100 messages/connection, 1 msg/sec rate limit).
- Retry logic: 2 retries with exponential backoff.

### Emails Sent
1. **Registration Confirmation** - PDF receipt attached, HTML branded email.
2. **Check-in Confirmation** - Batch schedule PDF attached, batch assignment details.
3. **System Error Alerts** - Sent to `devamgupta@jklu.edu.in` on system failures.

### PDF Generation (`lib/registrationHelper.ts` → `generatePDF()`)
- A4 format via `pdf-lib`.
- Embeds JKLU + Sankalp logos from `public/logos/`.
- QR code generated via `qrcode` npm package.
- Sections: Participant Details, Affiliation, Paper Details, Payment Summary.

---

## 12. UI/UX CONVENTIONS

### Brand Colors
| Name | Hex | Usage |
|---|---|---|
| `brand-orange` | `#f5821e` | Primary accent, CTAs, highlights |
| `brand-blue` | `#184176` | Secondary accent, links, headers |
| `brand-ink` | `#030404` | Text, borders |
| `brand-cloud` | `#ffffff` | Backgrounds, text on dark |

### Design System
- **Font**: `Outfit` (display + body), `Source Sans 3`, `Merriweather`.
- **Neo-Brutalist / Comic style**: `.comic-btn-*`, `.border-comic`, `.comic-bubble`, `.comic-starburst`, `.bg-halftone-*`, solid box shadows.
- **Custom CSS classes**: `.btn-primary`, `.btn-accent`, `.btn-blue`, `.page-eyebrow`, `.page-title`, `.page-subtitle`, `.section-heading`, `.input-field`.
- **Noise overlay**: Grain texture on desktop only.
- **Fluid marble background**: Animated blobs on hero sections.

### Component Conventions
- All components use `'use client'` directive where needed.
- `cn()` utility from `lib/utils.ts` for conditional class merging (`clsx` + `tailwind-merge`).
- Framer Motion for page transitions and scroll animations.
- GSAP for complex timeline animations.

---

## 13. DEPLOYMENT

### Platform: Vercel
- Auto-detected Next.js framework.
- `npm run build` runs `next build`.
- Environment variables set in Vercel dashboard.
- `FIREBASE_SERVICE_ACCOUNT` env var contains the JSON credential (base64 or raw JSON).

### Firebase Project: `sankalp-27` (or `sankalp-2027`)
- Firestore in `us-central1`.
- Auth: email/password enabled.
- App Check: ReCaptcha v3 in production, debug tokens in development.

### Build Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm test` | Run security test script |

---

## 14. KEY BUSINESS RULES

1. **Registrations are server-side only** - client cannot directly create Firestore docs in `registrations`.
2. **Background tasks run exactly once** - `backgroundTaskLocks` prevents duplicate emails/sheet syncs.
3. **Atomic registration locks** - `registrationLocks` prevents duplicate registration records for same order.
4. **Settlement reconciliation** - runs via Cloud Scheduler (cron) or manual admin trigger; processes 12 records max per run; throttles 1.5s between Cashfree API calls.
5. **Sheet sync** - manual trigger from admin; pushes unsent registrations to Google Sheets via Apps Script webhook.
6. **Scanner accounts** - Firebase Auth accounts with `scanner` role; managed from admin panel.
7. **QR code = Firestore registration doc ID** - scanner validates by looking up the scanned ID in `registrations`.

---

## 15. DEVELOPMENT PATTERNS

### Adding a new page
1. Create `app/<route>/page.tsx`.
2. Add link to `Navbar.tsx` if public, or `AdminSidebar.tsx` / `ScannerSidebar.tsx` if internal.
3. Add to `robots.ts` disallow list if internal.
4. Add to `sitemap.ts` if public.

### Adding a new API route
1. Create `app/api/<route>/route.ts`.
2. Use `verifyAuthRole(req, ['admin'])` for protected endpoints.
3. Apply `isRateLimited(ip, limit, windowMs)` for public endpoints.
4. Always `sanitizeObject()` incoming data.
5. Use `adminDb` (Admin SDK) for Firestore writes in API routes.

### Adding a new Firestore collection
1. Add security rules to `firestore.rules`.
2. Add composite index to `firestore.indexes.json` if needed.
3. Use `adminDb.collection('<name>')` in server code.
4. Use `db` (client SDK) only if client read access is needed (with appropriate rules).

### Code Style
- No comments unless explicitly requested.
- Functional components with hooks.
- TypeScript with `any` used sparingly (mostly in legacy/external API response handling).
- Server-side: `adminDb` and `adminAuth` from `lib/firebaseAdmin.ts`.
- Client-side: `db`, `auth`, `storage` from `lib/firebase.ts` (nullable - check `isFirebaseConfigured()`).

---

## 16. KNOWN LIMITATIONS & TECHNICAL DEBT

1. **Strict mode is off** in `tsconfig.json` (`"strict": false`).
2. **Storage rules are fully open** - `allow read, write: if true` in `storage.rules`.
3. **In-memory rate limiting** is process-local - cold starts on serverless can bypass limits.
4. **`validateRegistrationNumber()`** always returns `true` (bypassed for international conference).
5. **Some demo/placeholder data** remains - see `DEMO_DATA_SUMMARY.txt` for full list.
6. **Missing production assets** - speaker photos, hotel images, official logos - see `SITE_REQUIREMENTS.txt`.
7. **`check-in/page.tsx`** appears to be a static prototype (hardcoded stats).
8. **Test coverage** - only `scripts/test-security.ts` exists; no unit/integration tests.

---

## 17. RELATED DOCUMENTS

| File | Purpose |
|---|---|
| `docs/SITE_REQUIREMENTS.txt` | Complete inventory of production assets needed before launch |
| `docs/DEMO_DATA_SUMMARY.txt` | Lists all placeholder/mock data still in the codebase |
| `docs/SECURITY.md` | Security guidelines and secrets management |
| `README.md` | Setup and deployment instructions |
| `public/llms.txt` | SEO content for AI crawlers |
| `.env.example` | Environment variable template |

---

*Last updated: 2026-08-01. Reflects post-professionalization structure: HomeClient moved to components/home/, proxy.ts renamed to middleware.ts, docs/ directory added, service-account.json removed.*
