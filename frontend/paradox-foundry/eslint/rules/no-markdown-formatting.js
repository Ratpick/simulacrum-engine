/**
 * @fileoverview Disallow Markdown-style formatting in JSX text
 * @author Your Name
 */

'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Markdown-style formatting in JSX text',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [], // no options
    messages: {
      noMarkdownBold: 'Use <strong> or <span className="font-bold"> instead of ** ** for bold text',
      noMarkdownItalic: 'Use <em> or <span className="italic"> instead of * * for italic text',
      noMarkdownCode: 'Use <code> or <span className="font-mono"> instead of backticks for code',
    },
  },

  create(context) {
    return {
      JSXText(node) {
        const text = node.value.trim();
        
        if (!text) {
          return;
        }

        if (text.includes('**')) {
          context.report({
            node,
            messageId: 'noMarkdownBold',
            loc: node.loc,
          });
        }

        if (text.includes('*') && (text.startsWith('*') || text.endsWith('*'))) {
          context.report({
            node,
            messageId: 'noMarkdownItalic',
            loc: node.loc,
          });
        }

        if (text.includes('`')) {
          context.report({
            node,
            messageId: 'noMarkdownCode',
            loc: node.loc,
          });
        }
      },
    };
  },
};
