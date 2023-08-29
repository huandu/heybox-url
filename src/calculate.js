import { hash } from './hash.js';

const heyboxURLPrefix = 'https://api.xiaoheihe.cn/';

export function calculate(url, timestamp = 0, nonce = '') {
  if (url?.indexOf(heyboxURLPrefix) !== 0) {
    throw new Error(`Not a Heybox url: ${url}`);
  }

  return hash(url, timestamp, nonce);
}
