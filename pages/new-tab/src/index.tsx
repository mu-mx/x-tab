import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/views/app';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(<App />);
}

init();
