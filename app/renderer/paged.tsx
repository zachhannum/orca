import { createRoot } from 'react-dom/client';
import PagedRenderer from './components/PagedRenderer';

import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/400-italic.css';
import '@fontsource/crimson-pro/700.css';
import '@fontsource/crimson-pro/700-italic.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/700-italic.css';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/roboto-mono/400-italic.css';
import '@fontsource/roboto-mono/700.css';
import '@fontsource/roboto-mono/700-italic.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<PagedRenderer />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.myPing();
