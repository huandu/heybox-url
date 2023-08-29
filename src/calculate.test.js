import { calculate } from './index.js';

it('Validate hash correctness', () => {
  const host = 'https://api.xiaoheihe.cn';
  const ts = 1676275161;
  const nonce = '0RDI368QON7TBHCVILXHRH4DHBNLSJCZ';
  const urls = [
    '/foo/bar?k1=v1&k2=v2',
    '/foo/123/api?bar=xxx&type=mmm',
    '/bar/xxxx/gogo?client=zzzz&sort=1&app=heybox',
  ];
  const expected = [
    `https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2&hkey=DMPQ114&_time=${ts}&nonce=${nonce}`,
    `https://api.xiaoheihe.cn/foo/123/api?bar=xxx&type=mmm&hkey=GT1N296&_time=${ts}&nonce=${nonce}`,
    `https://api.xiaoheihe.cn/bar/xxxx/gogo?client=zzzz&sort=1&app=heybox&hkey=R9FNG20&_time=${ts}&nonce=${nonce}`,
  ];

  urls.forEach((url, idx) => {
    expect(calculate(`${host}${url}`, ts, nonce)).toBe(expected[idx]);
  });
});
