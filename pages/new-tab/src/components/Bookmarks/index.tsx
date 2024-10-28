import { bookmarksSvg, bySvg, ggSvg } from '@/assets/img';
import { useReactive } from 'ahooks';
import { Card, Input, Modal, Select, Space } from 'antd';
import Icon from '@ant-design/icons';
import { useEffect } from 'react';

const EditModal = (props: any) => {
  const { open, ok, cancel, title, row, type } = props;

  const state: any = useReactive({
    bookmarkTreeNodes: [],
  });

  const getList = async () => {
    if (open) {
      const bookmarkTreeNodes = await chrome.bookmarks.getTree();
      console.log(`bookmarkTreeNodes ->:`, bookmarkTreeNodes);
      state.bookmarkTreeNodes = bookmarkTreeNodes;
    }
  };

  useEffect(() => {
    getList();
  }, [open]);

  const clearForm = () => {};

  return (
    <Modal
      title={title}
      footer={null}
      open={open}
      onCancel={() => {
        cancel();
      }}
      width={'45%'}
      style={{ top: 60 }}
      destroyOnClose
    >
      <br />
      <br />
      <div>123</div>
    </Modal>
  );
};

export default function Search() {
  const state: any = useReactive({});

  const modalState = useReactive({
    open: false,
    title: '',
    type: 'add',
    row: {},

    viewShow: () => {
      modalState.open = true;
      modalState.title = '';
      modalState.type = 'view';
    },
    ok: () => {
      modalState.open = false;
    },
    cancel: () => {
      modalState.open = false;
    },
  });

  return (
    <>
      <Card
        hoverable
        cover={<Icon component={bookmarksSvg} />}
        style={{ width: '240px' }}
        title=" "
        onClick={() => {
          modalState.viewShow();
        }}
      >
        <div className="text-center">书签管理</div>
      </Card>

      <EditModal {...modalState} />
    </>
  );
}
