const enum HKeyAlgorithm {
  Plain = 'plain', // No nonce.
  Web = 'web',
  Android = 'android',
}

interface HKeyOptions {
  timestamp?: number; // Timestamp in seconds. Default to current time.
  nonce?: string; // Nonce. Default to a random string.
  algorithm?: HKeyAlgorithm; // Algorithm. Default to HKeyAlgorithm.Web.
}

/**
 * Calculates hash and returns a new url with hash parameters in query string.
 * The url must be a Heybox API url.
 * @param {string} url Heybox API url.
 * @param {HKeyOptions | undefined} options Options to customize hkey algorithm.
 * @returns {string}
 */
export declare function calculate(url: string, options?: HKeyOptions): string;
