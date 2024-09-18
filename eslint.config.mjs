import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['.dist/*'] },
  {
    files: ['**/*.{mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: 'off',
      eqeqeq: 'off',
      'no-undef': 'off',
      'no-useless-escape': 'warn',
      'prefer-const': ['warn', { ignoreReadBeforeAssign: true }],
      'no-unused-vars': [
        'off',
        {
          vars: 'all',
          args: 'after-used',
          caughtErrors: 'all',
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
