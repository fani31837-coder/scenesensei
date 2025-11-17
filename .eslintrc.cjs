module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  rules: {
    'prefer-const': 'warn',
    'no-var': 'error',
  },
}
