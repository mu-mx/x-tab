import { bySvg, ggSvg } from '@/assets/img';
import { useReactive } from 'ahooks';
import { Input, Select, Space } from 'antd';
import Icon from '@ant-design/icons';

const ssOptions = [
  {
    label: <Icon component={ggSvg} />,
    value: '1',
    url: 'https://www.google.com/search?q=',
    desc: '谷歌搜索',
  },
  {
    label: <Icon component={bySvg} />,
    value: '2',
    url: 'https://cn.bing.com/search?q=',
    desc: '必应搜索',
  },
];

export default function Search() {
  const state: any = useReactive({
    query: '',
    ss: '1',
    url: ssOptions[0].url,
  });

  return (
    <>
      <Input
        addonBefore={
          <Select
            style={{ width: '120px' }}
            options={ssOptions}
            size="large"
            value={state.ss}
            onChange={(value, option: any) => {
              state.ss = value;
              state.url = option.url;
            }}
            optionRender={(option) => (
              <Space>
                {option.data.label}
                {option.data.desc}
              </Space>
            )}
          />
        }
        size="large"
        placeholder="请输入"
        value={state.query}
        onChange={(e) => {
          state.query = e.target.value;
        }}
        onPressEnter={(e) => {
          // 谷歌插件打开新的搜索页面
          if (state.url && state.query) {
            const url = state.url + state.query;
            console.log(`url ->:`, url);
            chrome.tabs.create({ url });
            // 清空输入框
            state.query = '';
          }
        }}
        variant="filled"
      />
    </>
  );
}
