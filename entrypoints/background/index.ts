export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    // 创建右键菜单
    chrome.contextMenus.create({
      id: 'get-current-tab',
      title: '获取当前标签信息',
      contexts: ['all'], // 在所有上下文中都能显示
    });
  });

  // 监听右键菜单的点击事件
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'get-current-tab') {
      // 获取当前标签页的信息
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        alert(`当前标签页的信息：\n标题: ${currentTab.title}\nURL: ${currentTab.url}`);
        // 你也可以在这里做更多操作，例如向后台服务器发送请求等
      });
    }
  });
});
