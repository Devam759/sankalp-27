declare module '*.css';
declare module '@cashfreepayments/cashfree-js';
declare module 'node-fetch';

interface Window {
  grecaptcha?: {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}

