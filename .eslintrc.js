module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
      },
    "rules": {
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "func-names": ["error", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents": true }],
        "jsx-a11y/anchor-is-valid": [ "error", {"components": [ "Link" ], "specialLink": [ "to" ]}],
        "consistent-return": 0,
        "react/prop-types": 0,
        "prefer-destructuring": 0,
      }
};