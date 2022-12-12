Object.defineProperty(window, 'windowApi', {
  value: {
    os: jest.fn().mockImplementation(() => 'darwin'),
  },
});

Object.defineProperty(window, 'projectApi', {
  value: {
    openProject: jest.fn(),
    onOpenProject: jest.fn(),
  },
});

Object.defineProperty(window, 'appApi', {
  value: {
    getRecentProjects: jest.fn(),
    onRecentProjects: jest.fn(),
    appVersion: jest.fn().mockImplementation(() => new Promise<void>(() => {})),
    onSettings: jest.fn(),
  },
});

Object.defineProperty(window, 'electron', {
  value: {
    ipcRenderer: {
      on: jest.fn(),
    },
  },
});

Object.defineProperty(window, 'pagedApi', {
  value: {
    onBookPdfGenerated: jest.fn(),
  },
});
