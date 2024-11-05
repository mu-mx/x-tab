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
    commands: {
      'action:openAdminTab': {
        suggested_key: {
          default: 'Alt+Shift+M',
        },
        description: '__MSG_action_openAdminTab__',
      },
      'action:sendAllTabs': {
        suggested_key: {
          default: 'Alt+Shift+A',
        },
        description: '__MSG_action_sendAllTabs__',
      },
      'action:sendCurrentTab': {
        suggested_key: {
          default: 'Alt+Shift+C',
        },
        description: '__MSG_action_sendCurrentTab__',
      },
      'action:sendOtherTabs': {
        description: '__MSG_action_sendOtherTabs__',
      },
      'action:sendLeftTabs': {
        description: '__MSG_action_sendLeftTabs__',
      },
      'action:sendRightTabs': {
        description: '__MSG_action_sendRightTabs__',
      },
      // 激活option面板
      _execute_action: {
        suggested_key: {
          default: 'Alt+Shift+P',
        },
      },
    },
  },
});
