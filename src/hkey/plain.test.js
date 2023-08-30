import { HeyboxURLPrefix } from '../constants.js';
import { calculate } from './plain.js';

it('Validate hkey algorithm without nonce', () => {
  const host = HeyboxURLPrefix;
  const ts = 1699999990;
  const urls = [
    'foo/bar?k1=v1&k2=v2',
    'foo/123/api?bar=xxx&type=mmm',
    'bar/xxxx/gogo?client=zzzz&sort=1&app=heybox',
  ];
  const expected = [
    `hkey=JXDQP48&_time=${ts}`,
    `hkey=CGWW826&_time=${ts}`,
    `hkey=NVCXN14&_time=${ts}`,
  ];

  urls.forEach((url, idx) => {
    expect(calculate(`${host}${url}`, ts)).toBe(expected[idx]);
  });
});
