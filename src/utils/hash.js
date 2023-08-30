import { createHash, createHmac } from 'node:crypto';
import struct from 'python-struct';

export const md5 = (str) => {
  const h = createHash('md5');
  h.update(str);
  return h.digest();
};

export const sha1 = (str) => {
  const h = createHash('sha1');
  h.update(str);
  return h.digest();
};

export const sha1HMAC = (secret, timestamp) => {
  const h = createHmac('sha1', secret);
  h.update(struct.pack('>Q', [timestamp]));
  return h.digest();
};
