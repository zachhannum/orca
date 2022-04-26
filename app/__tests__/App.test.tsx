import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../renderer/App';

global.ResizeObserver = require('resize-observer-polyfill');

describe('App', () => {
  it('should render', () => {
    expect(render(<App />)).toBeTruthy();
  });
});
