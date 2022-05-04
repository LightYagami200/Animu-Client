module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'operator-linebreak': 'off',
    'consistent-return': 'off',
    'no-return-assign': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'function-paren-newline': 'off',
    curly: 'off',
    indent: 'off',
  },
};
