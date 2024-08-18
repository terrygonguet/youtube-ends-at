# youtube-ends-at

A simple webextension to display when a youtube video will end

Add-on stores:

-   [Chrome, Opera, Edge, Brave etc.](https://chrome.google.com/webstore/detail/youtube-ends-at/oahgfgokmkpgkbfnedkbbmnogjmfpljd)
-   [Firefox](https://addons.mozilla.org/en-US/firefox/addon/youtube-ends-at/)

## Building

Building requires node and the build script uses
[zx](https://www.npmjs.com/package/zx):

```sh
npm run build
# or
zx build.mjs
# or
chmod +x ./build.mjs
./build.mjs
```

Use the `-v` or `--verbose` flag to turn on detailed logging.

Use the `-s` or `--skip-build` flag to skip building the UI bundle and only
package the extension.

Use the `--mv2` and `--mv3` flags to build only for manifest V2 or V3
respectively.

The `dist` folder now contains all the extension files.
