module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": "off",
    "no-undef": "off",
    "comma-dangle": "off",
    "object-curly-spacing": "off",
    "eol-last": "off",
  },
  parserOptions: {
    "ecmaVersion": 8,
  },
};