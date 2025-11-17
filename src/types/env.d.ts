interface ImportMetaEnv {
  VITE_API_URL?: string
  VITE_APP_NAME?: string
  VITE_ENABLE_ANALYTICS?: string
  VITE_ENABLE_PROFILING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
