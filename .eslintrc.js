module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true
  },

  "extends": ["eslint:recommended", "plugin:jest/recommended", "plugin:react/recommended", "plugin:redux-saga/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "react-in-jsx-scope": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "jest",
    "redux-saga"
  ],
  "rules": {
    "react/displayName": [
      0
    ],
    "no-debugger": [
      0
    ],
    "indent": [
      "warn",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "semi": [
      "warn",
      "always"
    ],
    "no-console": [
     1 
    ]
  }
};
