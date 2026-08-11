const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcnfYAtAAAAANwsn9-4TPzCpIPHLfQ2Mq-C5LQk';

/**
 * Client-side helper function to execute Google reCAPTCHA v3
 * and obtain a verification response token for user actions.
 *
 * @param action The name of the user action (e.g. 'LOGIN', 'CONTACT_SUBMIT', 'REGISTER')
 * @returns Promise resolving to token string or null if unavailable/timed out
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  return new Promise((resolve) => {
    // Fallback timeout to prevent UI lockup if reCAPTCHA fails to load (e.g., adblocker)
    const timeoutId = setTimeout(() => {
      console.warn(`[reCAPTCHA] Execution timed out for action: ${action}`);
      resolve(null);
    }, 4000);

    const tryExecute = () => {
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha!.execute(SITE_KEY, { action });
            clearTimeout(timeoutId);
            resolve(token);
          } catch (err) {
            console.error('[reCAPTCHA] Error executing grecaptcha:', err);
            clearTimeout(timeoutId);
            resolve(null);
          }
        });
      } else {
        clearTimeout(timeoutId);
        resolve(null);
      }
    };

    if (window.grecaptcha) {
      tryExecute();
    } else {
      // Retry briefly in case script is still loading asynchronously
      let checkCount = 0;
      const interval = setInterval(() => {
        checkCount++;
        if (window.grecaptcha) {
          clearInterval(interval);
          tryExecute();
        } else if (checkCount > 15) {
          clearInterval(interval);
          clearTimeout(timeoutId);
          resolve(null);
        }
      }, 100);
    }
  });
}
