
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
      "chunk-N3EO2QYY.js",
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
    'index.csr.html': {size: 23971, hash: 'cd2f20410c4ff10c5476afa3181e49df4537a455371a7f5de2bbace9c58aa776', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17331, hash: '098cbe8b454429227350a034d54943529849938f0a6fc741277cef824784c6d7', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-ZOHK2DIU.css': {size: 13470, hash: 'mHQwnfOuGLQ', text: () => import('./assets-chunks/styles-ZOHK2DIU_css.mjs').then(m => m.default)}
  },
};
