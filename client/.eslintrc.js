module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true,
      "node": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
  },
  "plugins": [
      "react", "jest", "cypress",
  ],
  "rules": {
      "indent": "off",
      "linebreak-style": 0,
      "quotes": 0,
      "semi": 0,
      "eqeqeq": "error",
      "no-trailing-spaces": 0,
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react/react-in-jsx-scope": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}