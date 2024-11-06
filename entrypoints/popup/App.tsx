import React, { useEffect } from 'react';
import { browser } from 'wxt/browser';

const adminTabUrl = browser.runtime.getURL('/options.html#/home');

export default function App() {
  const getList = async () => {
    // 打开选项页面

    await browser.tabs.create({
      index: 0,
      url: adminTabUrl,
    });

    // 关闭popup窗口
    // window.close();
  };

  useEffect(() => {
    getList();
  }, []);

  return null;
}
