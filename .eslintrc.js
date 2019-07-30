module.exports = {
    parser: 'babel-eslint',
    extends: [
        "eslint:recommended",
        "airbnb/base",
        "plugin:react/recommended",
        "./node_modules/eslint-config-airbnb/index.js"
    ],
    plugins: ["babel", "react"],
    env: {
        just: true,
        browser: true
    },
    rules: {
        "linebreak-style": 0,
        "react/prefer-stateless-function": 0,
        "react/forbid-prop-types": 1,
        "jsx-a11y/anchor-is-valid": 0,
        "import/prefer-default-export": 0,
        "class-methods-use-this": "off",
        "comma-dangle": ["error", "never"]
    }
};