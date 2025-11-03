declare global {
  interface Window {
    api: {
      spotify: {
        login: () => Promise<string>;
        logout: () => Promise<string>;
      };
      system: {
        openFolderDialog: () => Promise<string>;
      };
    };
  }
}

export {};
