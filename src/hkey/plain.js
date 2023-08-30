import struct from 'python-struct';
import { sha1HMAC } from '../utils/hash';
import { checksum } from '../utils/checksum';

const calculateDigest = (url, timestamp) => {
  const secret = Buffer.from(url).toString('base64');
  return sha1HMAC(secret, timestamp);
};

export const calculate = (url, timestamp = 0) => {
  timestamp ||= (Date.now() / 1000) >> 0;

  const { pathname } = new URL(url);
  const ts = timestamp + 1;
  const u =
    '/' +
    pathname
      .split('/')
      .filter((t) => t)
      .join('/') +
    '/';
  const digest = calculateDigest(u, ts);

  const dict = 'BCDFGHJKMNPQRTVWXY23456789';
  const rndPos = digest[19] & 0xf;

  let key = '';
  let seed =
    struct.unpack('>I', digest.subarray(rndPos, rndPos + 4))[0] & 0x7fffffff;

  for (let i = 0; i < 5; i++) {
    const c = seed % dict.length;
    seed = ~~(seed / dict.length);
    key += dict[c];
  }

  const suffix = checksum(
    key
      .slice(-4)
      .split('')
      .map((c) => c.charCodeAt(0))
  )
    .toString()
    .padStart(2, '0');

  return `hkey=${key}${suffix}&_time=${timestamp}`;
};
