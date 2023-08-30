import { HeyboxURLPrefix } from '../constants.js';
import { calculate } from './android.js';

it('Validate hkey algorithm for android', () => {
  const host = HeyboxURLPrefix;
  const ts = 1699999990;
  const nonce = '0RDi368qON7TBHcVILXhrh4DhbnLsJcz';
  const urls = [
    'foo/bar?k1=v1&k2=v2',
    'foo/123/api?bar=xxx&type=mmm',
    'bar/xxxx/gogo?client=zzzz&sort=1&app=heybox',
  ];
  const expected = [
    `hkey=M4J6F36&_time=${ts}&nonce=${nonce}`,
    `hkey=VHIC338&_time=${ts}&nonce=${nonce}`,
    `hkey=C5ICY02&_time=${ts}&nonce=${nonce}`,
  ];

  urls.forEach((url, idx) => {
    expect(calculate(`${host}${url}`, ts, nonce)).toBe(expected[idx]);
  });
});
