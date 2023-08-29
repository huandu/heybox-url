import { createHmac } from 'node:crypto';
import struct from 'python-struct';

const calculateDigest = (url, timestamp) => {
  const secret = Buffer.from(url).toString('base64');
  const h = createHmac('sha1', secret);
  h.update(struct.pack('>Q', [timestamp]));
  return h.digest();
};

function hr(t) {
  return lr(t) ^ t;
}

function dr(t) {
  return hr(lr(t));
}

function pr(t) {
  return dr(hr(lr(t)));
}

function yr(t) {
  return pr(t) ^ dr(t) ^ hr(t);
}

function lr(t) {
  return 128 & t ? 255 & ((t << 1) ^ 27) : t << 1;
}

export const hash = function (url, timestamp = 0) {
  timestamp ||= (Date.now() / 1000) >> 0;

  const { pathname } = new URL(url);
  const ts = timestamp + 1;
  const n = '/'.concat(
    pathname
      .split('/')
      .filter(function (t) {
        return t;
      })
      .join('/'),
    '/'
  );
  const dict = 'BCDFGHJKMNPQRTVWXY23456789';
  const digest = calculateDigest(n, ts);
  const mid = 15 & digest.subarray(19, 20)[0];
  let key = '';
  let idx = 2147483647 & struct.unpack('>I', digest.subarray(mid, mid + 4))[0];

  for (let f = 0; f < 5; f++) {
    const c = idx % dict.length;
    idx = ~~(idx / dict.length);
    key += dict[c];
  }

  const tail = key
    .slice(-4)
    .split('')
    .map((c) => c.charCodeAt());
  let e = [0, 0, 0, 0];
  e[0] = yr(tail[0]) ^ pr(tail[1]) ^ dr(tail[2]) ^ hr(tail[3]);
  e[1] = hr(tail[0]) ^ yr(tail[1]) ^ pr(tail[2]) ^ dr(tail[3]);
  e[2] = dr(tail[0]) ^ hr(tail[1]) ^ yr(tail[2]) ^ pr(tail[3]);
  e[3] = pr(tail[0]) ^ dr(tail[1]) ^ hr(tail[2]) ^ yr(tail[3]);
  tail[0] = e[0];
  tail[1] = e[1];
  tail[2] = e[2];
  tail[3] = e[3];

  const tailValue = tail.reduce((t, e) => t + e);
  let suffix = (tailValue % 100).toString();

  if (suffix.length < 2) {
    suffix = '0' + suffix;
  }

  const hkey = key + suffix;
  return url + '&hkey=' + hkey + '&_time=' + timestamp;
};
