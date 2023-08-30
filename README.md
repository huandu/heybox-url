# Calculate Heybox URL Hash

[Heybox](https://www.xiaoheihe.cn/) is a famous Chinese gamer community. There are lots of useful articles and game reviews on this site. To protect their valuable assets, Heybox uses relatively complex anti-crawler algorithm to sign every request. They really do a great job on this algorithm, so I spend some time to study how it works and publish this package as a way to share my learnings to everyone.

In this package, only `hkey` hash algorithm is published by `calculate(url)`. It's not enough to use this hash to fetch any Heybox's API, which requires more hashes and per-request nonce for every API call. So I think it may be OK to make this package public available on NPM.

To Heybox dev team: If my understanding is not true, please contact me by opening new issues in this project and let me know your concern.

## Usage

To add `hkey` on a url, call `calculate(url)`.

```javascript
import { calculate } from 'heybox-url';

const url = calculate('https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2');

// hkey and _time are added in the query string.
url === 'https://api.xiaoheihe.cn/foo/bar?k1=v1&k2=v2&hkey=KM6MP94&_time=1693395090';
```

## API

````typescript
const enum HKeyAlgorithm {
  Plain = 'plain', // No nonce.
  Web = 'web',
  Android = 'android',
}

interface HKeyOptions {
  timestamp?: number; // Timestamp in seconds. Default to current time.
  nonce?: string; // Nonce. Default to a random string.
  algorithm?: HKeyAlgorithm; // Algorithm. Default to 'plain'.
}

/**
 * Calculates hash and returns a new url with hash parameters in query string.
 * The url must be a Heybox API url.
 * @param {string} url Heybox API url.
 * @param {HKeyOptions | undefined} options Options to customize hkey algorithm.
 * @returns {string}
 */
export declare function calculate(url: string, options?: HKeyOptions): string;
```

## License

MIT
