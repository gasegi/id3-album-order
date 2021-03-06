module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: false,
      impliedStrict: true,
    }
  },
  env: {
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  rules: {
    // enable additional rules
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],

    // override default options for rules from base configurations
    'comma-dangle': ['error', 'always'],
    'no-cond-assign': ['error', 'always'],

    // disable rules from base configurations
    'no-console': 'off',
  }
}