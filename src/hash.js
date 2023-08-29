import { createHmac } from 'node:crypto';
import struct from 'python-struct';

const calculateDigest = (url, timestamp) => {
  const secret = Buffer.from(url).toString('base64');
  const h = createHmac('sha1', secret);
  h.update(struct.pack('>Q', [timestamp]));
  return h.digest();
};

function c0(v) {
  return c1(v) ^ c2(v) ^ c3(v);
}

function c1(v) {
  return c2(c3(convertByte(v)));
}

function c2(v) {
  return c3(convertByte(v));
}

function c3(v) {
  return convertByte(v) ^ v;
}

function convertByte(v) {
  return v & 0x80 ? 0xff & ((v << 1) ^ 0x1b) : v << 1;
}

export const hash = (url, timestamp = 0) => {
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
  const dict = 'BCDFGHJKMNPQRTVWXY23456789';
  const digest = calculateDigest(u, ts);
  const mid = digest.subarray(19, 20)[0] & 0xf;
  let key = '';
  let idx = struct.unpack('>I', digest.subarray(mid, mid + 4))[0] & 0x7fffffff;

  for (let i = 0; i < 5; i++) {
    const c = idx % dict.length;
    idx = ~~(idx / dict.length);
    key += dict[c];
  }

  const tail = key
    .slice(-4)
    .split('')
    .map((c) => c.charCodeAt(0));
  let e = [0, 0, 0, 0];
  e[0] = c0(tail[0]) ^ c1(tail[1]) ^ c2(tail[2]) ^ c3(tail[3]);
  e[1] = c3(tail[0]) ^ c0(tail[1]) ^ c1(tail[2]) ^ c2(tail[3]);
  e[2] = c2(tail[0]) ^ c3(tail[1]) ^ c0(tail[2]) ^ c1(tail[3]);
  e[3] = c1(tail[0]) ^ c2(tail[1]) ^ c3(tail[2]) ^ c0(tail[3]);
  tail[0] = e[0];
  tail[1] = e[1];
  tail[2] = e[2];
  tail[3] = e[3];

  const tailValue = tail.reduce((prev, value) => prev + value);
  let suffix = (tailValue % 100).toString();

  if (suffix.length < 2) {
    suffix = '0' + suffix;
  }

  const hkey = key + suffix;
  return url + '&hkey=' + hkey + '&_time=' + timestamp;
};
