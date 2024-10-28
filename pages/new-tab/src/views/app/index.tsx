import React from 'react';
import { Button, Card, Divider, Input, Select, Space } from 'antd';
import style from './index.module.css';
import { useReactive } from 'ahooks';
import Search from '@/components/Search';
import Bookmarks from '@/components/Bookmarks';

const App: React.FC = () => {
  const state: any = useReactive({
    bgColor: '#f0f0f0',
  });



  return (
    <div className={style.app} style={{ backgroundColor: state.bgColor }}>
      <div className={`flex flex-center  ${style['card-wrapper']}`}>
        <div className={style.card}>
          <Search />
          <Divider />

          <Space>
            <Bookmarks />
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
