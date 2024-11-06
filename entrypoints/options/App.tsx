import React from 'react';
import './style.less';
import { App, Button, ConfigProvider, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  HomeOutlined,
  ImportOutlined,
  MailOutlined,
  RestOutlined,
  SettingOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import { pick } from 'lodash-es';

import Home from '@/entrypoints/options/pages/home';

const { Header, Footer, Sider, Content } = Layout;

const LayoutComponent = (param: any) => {
  return (
    <>
      <Header className={`header `}>
        <Menu mode="horizontal" items={items} className={`header-menu`} />

        <div className={`header-right`}>
          <Button type="primary">156161</Button>
        </div>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
};

const items = [
  {
    key: 'home',
    label: '首页',
    path: '/home',
    icon: <HomeOutlined />,
    element: <Home />,
  },
  {
    key: 'settings',
    label: '设置',
    path: '/settings',
    icon: <SettingOutlined />,
    // element: <Settings />,
  },
  {
    key: 'import-export',
    label: '导入/导出',
    path: '/import-export',
    icon: <ImportOutlined />,
    // element: <ImportExport />,
  },
  {
    key: 'sync',
    label: '同步',
    path: '/sync',
    icon: <SyncOutlined />,
    // element: <SyncPage />,
  },
  {
    key: 'recycleBin',
    label: '回收站',
    path: '/recycle',
    icon: <RestOutlined />,
    // element: <RecycleBin />,
  },
];

const router = createHashRouter([
  {
    element: <LayoutComponent />,
    children: [
      {
        path: '/',
        // element: <Home />,
      },
      ...items.map((item: any) => pick(item, ['path', 'element'])),
    ],
  },
]);

export default function AppComponent() {
  return (
    <ConfigProvider>
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  );
}
