module.exports = {
  "parser": "babel-eslint",
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:flowtype/recommended"],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true,
      "experimentalObjectRestSpread": true,
      "experimentalDecorators": true
    }
  },
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "plugins": [
    "react",
    "flowtype"
  ],
  "rules": {
    "strict": ["error", "global"],
    "no-unused-vars": ["warn", { "vars": "all", "args": "all", "caughtErrors": "none" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "camelcase": ["error", { "properties": "always" }],
    "consistent-return": "error",
    "arrow-spacing": "error",
    "arrow-parens": ["error", "always"],
    "arrow-body-style": ["warn", "as-needed"],
    "semi": ["error", "always"],
    "no-confusing-arrow": ["error", { "allowParens": false }],
    "no-constant-condition": "error",
    "no-labels": "error",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "func-style": "off",
    "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
    "react/forbid-prop-types": ["error", { "forbid": ["any"] }],
    "react/jsx-boolean-value": "warn",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": "warn",
    "react/jsx-indent-props": "off",
    "react/jsx-key": "warn",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-literals": "off",
    "react/jsx-pascal-case": "warn",
    "react/jsx-sort-prop-types": "off",
    "react/jsx-sort-props": "off",
    "react/jsx-wrap-multilines": "error",
    "react/no-multi-comp": "warn",
    "react/no-set-state": "off",
    "react/prefer-es6-class": "warn",
    "react/self-closing-comp": "warn",
    "react/sort-comp": "warn",
    "react/sort-prop-types": "warn",
  }
};