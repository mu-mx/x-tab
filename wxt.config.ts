import { defineConfig } from 'wxt';

export default defineConfig({
  // entrypointLoader: 'jiti',
  // extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'X Tab | 标签页管理',
    permissions: [
      'storage',
      'tabs',
      'tabGroups',
      'contextMenus',
      'unlimitedStorage',
      'commands',
      'favicon',
    ],
    homepage_url: 'https://github.com/mu-mx/x-tab',
    host_permissions: ['<all_urls>'],
    default_locale: 'zh_CN',
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';",
      sandbox:
        "sandbox allow-scripts; script-src 'self' 'unsafe-eval' https://api.github.com https://gitee.com; object-src 'self'",
    },
    commands: {},
  },
});
