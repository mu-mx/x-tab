import React from 'react';
import { Button } from 'antd';

const App: React.FC = () => {
  const displayBookmarks = async () => {
    const bookmarkTreeNodes = await chrome.bookmarks.getTree();
    console.log(`bookmarkTreeNodes ->:`, bookmarkTreeNodes);
  };

  return (
    <>
      <Button onClick={displayBookmarks}>App</Button>
    </>
  );
};

export default App;
