import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  .Modal {
    :focus { outline: none; }
    background-color: ${(p) => p.theme.contextMenuBg};
    backdrop-filter: blur(100px);
    border-radius: 20px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.5);
  }
  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000080;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
  .ReactModalPortal {
    position: absolute;
    height: 1px;
    width: 1px;
  }
`;

export default GlobalStyles;
