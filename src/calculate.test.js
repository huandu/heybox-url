import { HeyboxURLPrefix } from './constants.js';
import { calculate } from './calculate.js';

it('Validate public api correctness', () => {
  const host = HeyboxURLPrefix;
  const ts = 1699999990;
  const nonce = '37FBC69BA28C6791605F5E0D96F01141';

  // Test plain algorithm with all kinds of different url format.
  {
    const pathname = 'foo/bar';
    const query = 'k1=v1&k2=v2';
    const hash = `hkey=JXDQP48&_time=${ts}`;
    expect(calculate(`${host}${pathname}?${query}`, { timestamp: ts })).toBe(
      `${host}${pathname}?${query}&${hash}`
    );
    expect(calculate(`${host}${pathname}`, { timestamp: ts })).toBe(
      `${host}${pathname}?${hash}`
    );
    expect(calculate(`${host}${pathname}/`, { timestamp: ts })).toBe(
      `${host}${pathname}/?${hash}`
    );
  }

  expect(() => calculate(`https://foo.bar.com/a`)).toThrowError();
});
