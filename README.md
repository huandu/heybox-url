# Calculate Heybox URL Hash

[Heybox](https://www.xiaoheihe.cn/) is a famous Chinese gamer community. There are lots of useful articles and game reviews on this site. To protect their valuable assets, Heybox uses relatively complex anti-crawler algorithm to sign every request. They really do a great job on this algorithm, so I spend some time to study how it works and publish this package as a way to share my learnings to everyone.

In this package, only `hkey` hash algorithm is published by `calculate(url)`. It's not enough to use this hash to fetch any Heybox's API, which requires more hashes and per-request nounce for every API call. So I think it may be OK to make this package public available on NPM.

To Heybox dev team: If my understanding is not true, please contact me by opening new issues in this project and let me know your concern.

## Usage

To add `hkey` on a url, call `calculate(url)`.

```javascript
import { calculate } from 'heybox-url';

const url = calculate('https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2');

// hkey and _time are added in the query string.
url === 'https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2&hkey=DMPQ114&_time=1676275161&nonce=0RDI368QON7TBHCVILXHRH4DHBNLSJCZ';
```

## License

MIT
