/**
 * Calculates hash and returns a new url with hash query strings.
 * The url must be a Heybox API url.
 * @param {string} url Heybox API url.
 * @param {number | undefined} timestamp? Current time in seconds.
 * @param {string | undefined} nonce? Random 16-byte string.
 * @returns {string}
 */
export declare function calculate(
  url: number,
  timestamp?: number,
  nonce?: string
): string;
