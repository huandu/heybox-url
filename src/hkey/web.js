import { checksum } from '../utils/checksum';
import { md5 } from '../utils/hash';

const dict = 'JKMNPQRTX1234OABCDFG56789H';

export const calculate = (url, timestamp = 0, nonce = '') => {
  timestamp ||= (Date.now() / 1000) >> 0;
  nonce ||= md5(Math.random().toString()).toString('hex').toUpperCase();

  const { pathname } = new URL(url);
  const ts = timestamp + 1;
  const u =
    '/' +
    pathname
      .split('/')
      .filter((t) => t)
      .join('/') +
    '/';

  let key = '';
  const nonceHash = md5((nonce + dict).replace(/[^0-9]/g, ''))
    .toString('hex')
    .toLowerCase();
  const rnd = md5(ts + u + nonceHash)
    .toString('hex')
    .replace(/[^0-9]/g, '')
    .slice(0, 9)
    .padEnd(9, '0');

  for (let c = +rnd, i = 0; i < 5; i++) {
    const u = c % dict.length;
    c = ~~(c / dict.length);
    key += dict[u];
  }

  const suffix = checksum(
    key
      .slice(-4)
      .split('')
      .map((c) => c.charCodeAt(0))
  )
    .toString()
    .padStart(2, '0');

  return `hkey=${key}${suffix}&_time=${timestamp}&nonce=${nonce}`;
};
