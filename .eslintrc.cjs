module.exports = {
  extends: ['semistandard'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    camelcase: 'error',
    'no-duplicate-imports': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-var': 2,
    'no-undefined': 2,
    'no-use-before-define': 2,
    'no-unused-vars': 'warn',
    semi: ['error', 'never'],
    eqeqeq: ['error', 'always']
  }
}
