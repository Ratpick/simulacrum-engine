module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'paradox-foundry'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Our custom rule for detecting Markdown formatting in JSX text
    'paradox-foundry/no-markdown-formatting': 'error',
    
    // Disable some default rules that might conflict with our custom rule
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    
    // Additional recommended rules
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed with Next.js
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        // TypeScript specific rules can go here
      },
    },
  ],
};
