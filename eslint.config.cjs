const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const { FlatCompat } = require('@eslint/eslintrc');
const compat = new FlatCompat({ baseDirectory: __dirname });

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'allure-results/**',
      'allure-report/**',
      'playwright-report/**',
      'test-results/**',
      'eslint.config.cjs',
      'playwright.config.ts',
      'tsconfig.json',
    ],
  },

  ...compat.extends('plugin:import/recommended'),
  js.configs.recommended,
  prettier,

  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },

      // ✅ Aqui definimos todos os "globals" válidos no ambiente Node
      globals: {
        console: 'readonly',
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        exports: 'writable',
      },
    },

    plugins: {
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
    },

    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,

      // Imports
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'off',

      // Consoles e variáveis globais
      'no-console': 'off',
      'no-undef': 'off',

      // TypeScript e Playwright-friendly adjustments
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];
