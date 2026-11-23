module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs', 'postcss.config.js', 'tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: { react: { version: 'detect' } },
  rules: {
    'react-refresh/only-export-components': 'off', // sólo afecta al hot reload en dev
    'react/prop-types': 'off',
  },
}
