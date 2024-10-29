import { bookmarksSvg, bySvg, ggSvg } from '@/assets/img';
import { useReactive } from 'ahooks';
import { Card, Col, Divider, Input, Modal, Row, Select, Space, Tree } from 'antd';
import Icon from '@ant-design/icons';
import { useEffect } from 'react';

// 写一个方法，先将树形结构转换为扁平结构，然后给拥有 children 的元素 的对象 一个标识
function flattenBookmarkTree(bookmarkTree: any) {
  const flatList: any = [];

  function traverse(node: any, parentId = null) {
    // 创建一个新的书签对象
    const bookmarkItem = {
      id: node.id,
      key: node.id,
      title: node.title,
      url: node.url || null, // 仅在有 URL 时才添加
      hasChildren: !!node.children, // 检查是否有子节点
      parentId: parentId, // 父节点 ID
    };

    // 将书签对象添加到扁平数组中
    flatList.push(bookmarkItem);

    // 如果当前节点有子节点，递归调用
    if (node.children) {
      node.children.forEach((child: any) => traverse(child, node.id));
    }
  }

  // 遍历书签树的每个节点
  bookmarkTree.forEach((node: any) => traverse(node));
  return flatList;
}

// 写一个方法，将扁平结构转换为树形结构
function convertFlatToTree(flatList: any) {
  const map: any = {};
  const tree: any = [];

  // 首先将每个节点存入映射中
  flatList.forEach((node: any) => {
    map[node.id] = { ...node, children: [] }; // 创建一个包含 children 属性的新对象
  });

  // 然后构建树形结构
  flatList.forEach((node: any) => {
    if (node.parentId) {
      // 如果当前节点有父节点，将其添加到父节点的 children 数组中
      map[node.parentId].children.push(map[node.id]);
    } else {
      // 如果没有父节点，说明是根节点，直接添加到树中
      tree.push(map[node.id]);
    }
  });

  return tree;
}

const EditModal = (props: any) => {
  const { open, ok, cancel, title, row, type } = props;

  const state: any = useReactive({
    allBookmarkTreeNodes: [],

    bookmarkTreeNodes: [],

    urls: [],
  });

  const getList = async () => {
    if (open) {
      const bookmarkTreeNodes = await chrome.bookmarks.getTree();
      const data = bookmarkTreeNodes[0]?.children?.[0]?.children || [];
      console.log(`data ->:`, data);

      state.allBookmarkTreeNodes = flattenBookmarkTree(data);

      state.bookmarkTreeNodes = convertFlatToTree(
        state.allBookmarkTreeNodes.filter((item: any) => item.hasChildren),
      );

      console.log(`state.bookmarkTreeNodes ->:`, state.bookmarkTreeNodes);
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
      width={'55%'}
      style={{ top: 60 }}
      destroyOnClose
    >
      <br />
      <br />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <div>
            {state.bookmarkTreeNodes?.length && (
              <Tree
                height={480}
                blockNode
                showLine
                defaultExpandAll
                onSelect={(key) => {
                  state.urls = state.allBookmarkTreeNodes.filter(
                    (item: any) => item.parentId === key[0],
                  );
                }}
                treeData={state.bookmarkTreeNodes}
              />
            )}
          </div>
        </Col>
        <Col span={16}>
          <Input placeholder="请输入书签名称" />
          <Divider />
          <div style={{ height: 480, overflowY: 'auto' }}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {state.urls?.length ? (
                state.urls.map((item: any) => (
                  <p key={item.id}>
                    <a href={item.url} >{item.title}</a>
                  </p>
                ))
              ) : (
                <p>暂无数据</p>
              )}
            </Space>
          </div>
        </Col>
      </Row>
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
