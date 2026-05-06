module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/prettier',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: [ '.vue' ],
    },
    plugins: [ '@stylistic', '@typescript-eslint' ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'linebreak-style': 'off',
        indent: [ 'error', 4, { SwitchCase: 1, ignoredNodes: [ 'TemplateLiteral' ] } ],
        'vue/html-indent': [ 'error', 4 ],
        'vue/script-indent': [ 'error', 4, { baseIndent: 1, switchCase: 1 } ],
        'vue/block-lang': [ 'error', { script: { lang: 'ts' } } ],
        quotes: [ 'error', 'single', { avoidEscape: true, allowTemplateLiterals: true } ],
        'object-curly-spacing': [ 'error', 'always' ],
        'block-spacing': [ 'error', 'always' ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: { max: 1 },
                multiline: { max: 1 },
            },
        ],
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'below',
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'always',
            },
        ],
        '@typescript-eslint/no-unused-vars': [ 'error', { 
            vars: 'all', 
            args: 'after-used',
            varsIgnorePattern: '^props$',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        } ],
        'no-unused-vars': 'off',
    },
    overrides: [
        {
            files: [ '*.vue' ],
            rules: {
                indent: 'off',
            },
        },
    ],
};
