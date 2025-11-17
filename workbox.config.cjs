module.exports = {
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{js,css,woff2}',
  ],
  globIgnores: [
    'config/**/*',
  ],
  swDest: 'dist/sw.js',
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  clientsClaim: true,
  skipWaiting: true,
}
