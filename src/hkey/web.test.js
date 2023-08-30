import { HeyboxURLPrefix } from '../constants.js';
import { calculate } from './web.js';

it('Validate hkey algorithm for web', () => {
  const host = HeyboxURLPrefix;
  const ts = 1699999990;
  const nonce = '37FBC69BA28C6791605F5E0D96F01141';
  const urls = [
    'foo/bar?k1=v1&k2=v2',
    'foo/123/api?bar=xxx&type=mmm',
    'bar/xxxx/gogo?client=zzzz&sort=1&app=heybox',
  ];
  const expected = [
    `hkey=J1HH410&_time=${ts}&nonce=${nonce}`,
    `hkey=886KO86&_time=${ts}&nonce=${nonce}`,
    `hkey=D965608&_time=${ts}&nonce=${nonce}`,
  ];

  urls.forEach((url, idx) => {
    expect(calculate(`${host}${url}`, ts, nonce)).toBe(expected[idx]);
  });
});
