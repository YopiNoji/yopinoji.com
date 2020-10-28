module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "react-app",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "__PATH_PREFIX__": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module",
        "project": "./tsconfig.json",
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        "react/prop-types": 0,
    }
};
