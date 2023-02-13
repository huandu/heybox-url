import { calculate } from './index.js';

it('Validate hash correctness', () => {
  const host = 'https://api.xiaoheihe.cn';
  const ts = 1676275161;
  const urls = [
    '/foo/bar?k1=v1&k2=v2',
    '/foo/123/api?bar=xxx&type=mmm',
    '/bar/xxxx/gogo?client=zzzz&sort=1&app=heybox',
  ];
  const expected = [
    `https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2&hkey=7CPRX54&_time=${ts}`,
    `https://api.xiaoheihe.cn/foo/123/api?bar=xxx&type=mmm&hkey=3CP5F70&_time=${ts}`,
    `https://api.xiaoheihe.cn/bar/xxxx/gogo?client=zzzz&sort=1&app=heybox&hkey=KQ26930&_time=${ts}`,
  ];

  urls.forEach((url, idx) => {
    expect(calculate(`${host}${url}`, ts)).toBe(expected[idx]);
  });
});
