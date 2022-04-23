import { createRoot } from 'react-dom/client';
import App from './App';

require('@openfonts/poppins_latin');

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
