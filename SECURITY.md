# Security Guidelines & Secrets Management

This document outlines the security architecture and secrets management protocols for deploying the Next.js application.

## Secrets Management & Environment Variables

Next.js automatically isolates frontend and backend environment variables. It is critical that your DevOps and development teams understand which keys are safe to expose and which must be strictly protected.

### Public Identifiers (`NEXT_PUBLIC_*`)
These keys are safely exposed to the client bundle. They are used to identify the application to external services like Firebase and Google Analytics.
- **Do not** put real secrets here.
- **Safe to expose:**
  - `NEXT_PUBLIC_FIREBASE_API_KEY`
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

### Backend Secrets (Strictly Server-Side)
These variables must **never** be prefixed with `NEXT_PUBLIC_`. They provide root access or financial control over your backend systems.
- **Must be kept strictly confidential:**
  - `FIREBASE_SERVICE_ACCOUNT`: The JSON credential allowing root Admin SDK access to Firestore and Auth.
  - `CASHFREE_SECRET_KEY`: The API key authorizing financial transactions.
  - `CRON_SECRET`: The token used to authorize background automated jobs.
  - `EXCEL_SYNC_WEBHOOK_URL`: The URL destination for syncing data out of the application.

If any Backend Secret is accidentally committed to source control or exposed on the client, you must rotate the key immediately in the respective provider's console.

## Infrastructure Security
- **HTTPS Enforcement**: The Next.js `middleware.ts` forces a 301 redirect to HTTPS for all HTTP traffic in production environments, ensuring encryption in transit.
- **Traffic Logging**: The middleware logs all `/api/*` traffic and detects anomalous bursts (e.g., >50 requests per minute from a single IP), flagging them as `[SUSPICIOUS TRAFFIC]` in the server console logs for Datadog/Cloud Logging ingestion.
- **Firestore Rules**: Client-side database modifications are strictly protected. For example, `registrations` cannot be created client-side, and `notifications` can only be altered by authenticated Admins.

## Authentication
Firebase ID Tokens are utilized to prevent Insecure Direct Object Reference (IDOR). All administrative API routes extract the Bearer token via `lib/serverAuth.ts` and validate the user's role before processing requests.
