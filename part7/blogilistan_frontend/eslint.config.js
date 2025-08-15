import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import vitestGlobals from 'eslint-plugin-vitest-globals'
import testingLibrary from 'eslint-plugin-testing-library'
import prettierConfig from 'eslint-config-prettier'


export default defineConfig([
  globalIgnores(['dist', 'eslint.config.js', 'vite.config.js']),

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'testing-library': testingLibrary,
      react: reactPlugin,
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
      'vitest-globals': vitestGlobals,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: '18.2',
      },
    },
    globals: {
      ...globals.browser,
      ...vitestGlobals.environments['vitest-globals/env'].globals,
    },
    rules: {
      ...testingLibrary.configs['react'].rules,
      ...vitestGlobals.configs.recommended.rules,
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs['recommended'].rules,
      ...reactRefresh.configs.vite.rules,
      ...prettierConfig.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
    },
  },
])