module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 0,
    'react-native/no-inline-styles': 0,
    'radix': 0,
    'react/prop-types': 0,
    'react/display-name': 0
  }
};
