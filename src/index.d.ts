/**
 * Calculates hash and returns a new url with hash query strings.
 * The url must be a Heybox API url.
 * @param {string} url Heybox API url.
 * @param {number | undefined} timestamp? Current time in seconds.
 * @returns {string}
 */
export declare function calculate(url: number, timestamp?: number): string;
