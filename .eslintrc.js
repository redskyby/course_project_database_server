module.exports = {
    env: {
        browser: true,
        es2022: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "prettier/prettier": ["warn", { semi: true }],
        "@typescript-eslint/no-unused-vars": "warn",
    },
};
