import '@src/NewTab.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';

const NewTab = () => {
  const theme = useStorage(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'new-tab/logo_horizontal.svg' : 'new-tab/logo_horizontal_dark.svg';

  return <>15616</>;
};

export default withErrorBoundary(
  withSuspense(NewTab, <div>loading</div>),
  <div> Error Occur </div>,
);
