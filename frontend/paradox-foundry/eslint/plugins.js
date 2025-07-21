const noMarkdownFormatting = require('./rules/no-markdown-formatting');

module.exports = {
  rules: {
    'no-markdown-formatting': noMarkdownFormatting,
  },
  configs: {
    recommended: {
      plugins: ['paradox-foundry'],
      rules: {
        'paradox-foundry/no-markdown-formatting': 'error',
      },
    },
  },
};
