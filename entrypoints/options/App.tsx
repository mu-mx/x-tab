import React from 'react';
import './index.less';
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
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { pick } from 'lodash-es';

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
      <Content>Content</Content>
    </>
  );
};

const items = [
  {
    key: 'home',
    label: 'common.list',
    path: '/home',
    icon: <HomeOutlined />,
    // element: <Home />,
  },
  {
    key: 'settings',
    label: 'common.settings',
    path: '/settings',
    icon: <SettingOutlined />,
    // element: <Settings />,
  },
  {
    key: 'import-export',
    label: 'common.importExport',
    path: '/import-export',
    icon: <ImportOutlined />,
    // element: <ImportExport />,
  },
  {
    key: 'sync',
    label: 'common.sync',
    path: '/sync',
    icon: <SyncOutlined />,
    // element: <SyncPage />,
  },
  {
    key: 'recycleBin',
    label: 'common.recycleBin',
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
