
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 0,
    "route": "/login"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-4K5YQUYP.js",
      "chunk-OVGWPLWH.js"
    ],
    "route": "/home"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-ZBAUSC7L.js",
      "chunk-OVGWPLWH.js"
    ],
    "route": "/task-detail/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23971, hash: 'a94566790cf61fca7fe4f9fd4608126bca5ed77d61950fabc427aae69b05b138', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17331, hash: 'b2b59db97cd4fac3a389e8c5ddd05083b6f3cbeea336771bc4cba85e409947c0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZOHK2DIU.css': {size: 13470, hash: 'mHQwnfOuGLQ', text: () => import('./assets-chunks/styles-ZOHK2DIU_css.mjs').then(m => m.default)}
  },
};
