import { calculate as plain } from './hkey/plain.js';
import { calculate as web } from './hkey/web.js';
import { calculate as android } from './hkey/android.js';
import { HeyboxURLPrefix } from './constants.js';

/**
 * @param {string} url Heybox API url.
 * @param {import('.').HKeyOptions | undefined} options Options to customize hkey algorithm.
 * @returns {string}
 */
export function calculate(url, { timestamp = 0, nonce = '', algorithm } = {}) {
  if (url?.indexOf(HeyboxURLPrefix) !== 0) {
    throw new Error(`Not a Heybox url: ${url}`);
  }

  let query = '';

  switch (algorithm) {
    case 'web':
      query = web(url, timestamp, nonce);
      break;

    case 'android':
      query = android(url, timestamp, nonce);
      break;

    default:
      query = plain(url, timestamp, nonce);
  }

  const u = new URL(url);
  u.search += u.search ? '&' + query : query;
  return u.toString();
}
