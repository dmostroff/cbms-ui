interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_API_BASE_URL: string;
  // Add other variables as needed
}

export default interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly url: string;
}
