import { App, Card, List, Popconfirm } from 'antd';
import React from 'react';
import style from './index.module.less';
import { CloseOutlined } from '@ant-design/icons';
import { useReactive } from 'ahooks';

const initialItems = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
  { id: '4', content: 'Item 4' },
];

export default function Index() {
  const { message } = App.useApp();

  const state: any = useReactive({
    items: initialItems,
  });

  const confirm = (e: any) => {
    console.log(e);
  };

  const cancel = (e: any) => {
    console.log(e);
  };

  return (
    <>
      <div className={` ${style['home-page-wrapper']}`}>
        <div className={` ${style['home-page']}`}>
          <Card title="卡片标题" hoverable>
            <List
              size="small"
              bordered
              dataSource={state.items}
              renderItem={(item: any) => (
                <List.Item>
                  <div className={`${style['home-page-item']}`}>
                    <Popconfirm
                      title="确定删除吗？"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <CloseOutlined />
                    </Popconfirm>

                    <a target="_blank">{item.content}</a>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
