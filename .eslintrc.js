module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  globals: {
    window: true,
  },
  rules: {
    'react/prop-types': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'react/jsx-filename-extension': 0,
    'no-shadow': 'warn',
    'no-use-before-define': 'warn',
    'no-console': 'warn',
    camelcase: 'warn',
  },
};
