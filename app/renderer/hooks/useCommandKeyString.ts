const useCommandKeyString = () => {
  return window.windowApi.os() === 'darwin' ? '⌘' : 'Ctrl';
};

export default useCommandKeyString;
