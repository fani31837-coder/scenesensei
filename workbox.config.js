export default {
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{js,css,woff2}',
  ],
  globIgnores: [
    'config/**/*',
  ],
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
}
