import React from 'react';
import { Button, Card } from 'antd';

const App: React.FC = () => {
  const displayBookmarks = async () => {
    const bookmarkTreeNodes = await chrome.bookmarks.getTree();
    console.log(`bookmarkTreeNodes ->:`, bookmarkTreeNodes);
  };

  return (
    <>
      <Card>
        <Button onClick={displayBookmarks}>App</Button>
      </Card>
    </>
  );
};

export default App;
