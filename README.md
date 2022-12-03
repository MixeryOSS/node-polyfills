# Web APIs polyfills for Node
This package provides Web APIs polyfills for NodeJS, allows you to target Node with packages that strictly uses Web APIs.

While this package will forwards existing APIs when running in browser, it is better to just use Web APIs directly when you only target browser.

## Usage
```ts
import * as webApi from "@mixery/node-polyfills";

let blob = new webApi.Blob([new Uint8Array(12), "hello world"]);
let audioSample = new webApi.AudioBuffer(/* ... */);
// ...
```

## Implemented polyfills
- [AudioBuffer](./src/AudioBuffer.ts)
- [Blob (Partially)](./src/Blob.ts)
  + Blocked: Missing ``ReadableStream``

