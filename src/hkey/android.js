import struct from 'python-struct';
import { sha1HMAC } from '../utils/hash';
import { checksum } from '../utils/checksum';

const nonceDict =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const randomNonce = () => {
  let nonce = '';

  for (let i = 0; i < 32; i++) {
    nonce += nonceDict[(Math.random() * nonceDict.length) >> 0];
  }

  return nonce;
};

const calculateDigest = (url, timestamp) => {
  const secret = Buffer.from(url).toString('base64');
  return sha1HMAC(secret, timestamp);
};

export const calculate = (url, timestamp = 0, nonce = '') => {
  timestamp ||= (Date.now() / 1000) >> 0;
  nonce ||= randomNonce();

  const { pathname } = new URL(url);
  const u =
    '/' +
    pathname
      .split('/')
      .filter((t) => t)
      .join('/') +
    '/';
  const numberInNonce = nonce.replace(/[^0-9]/g, '');
  const ts = timestamp + numberInNonce.length;
  const digest = calculateDigest(u, ts);

  const dict = '2345JKMNPQRT6789BCDFGHVWXY' + nonce.toUpperCase();
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

  return `hkey=${key}${suffix}&_time=${timestamp}&nonce=${nonce}`;
};
