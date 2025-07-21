"use strict";

/**
 * @fileoverview Disallow Markdown-style formatting in JSX/TSX files
 * @author Your Name
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow Markdown-style formatting in JSX/TSX files',
      category: 'Best Practices',
      recommended: true,
      url: 'https://github.com/your-org/your-repo/blob/main/eslint/rules/no-markdown-style.js',
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
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function checkText(node, text) {
      if (typeof text !== 'string') return;

      // Check for bold text: **bold** or __bold__
      const boldRegex = /\*\*[^\s*][^*]*[^\s*]\*\*|__[^\s_][^_]*[^\s_]__/g;
      let match;
      
      while ((match = boldRegex.exec(text)) !== null) {
        context.report({
          node,
          messageId: 'noMarkdownBold',
          loc: {
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index,
            },
            end: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index + match[0].length,
            },
          },
        });
      }

      // Check for italic text: *italic* or _italic_
      const italicRegex = /(?:^|\s)(\*|_)[^\s*_][^*_]*[^\s*_](\*|_)(?=\s|$)/g;
      while ((match = italicRegex.exec(text)) !== null) {
        context.report({
          node,
          messageId: 'noMarkdownItalic',
          loc: {
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index + match[1].length,
            },
            end: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index + match[0].length - 1,
            },
          },
        });
      }

      // Check for inline code: `code`
      const codeRegex = /`[^`]+`/g;
      while ((match = codeRegex.exec(text)) !== null) {
        context.report({
          node,
          messageId: 'noMarkdownCode',
          loc: {
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index,
            },
            end: {
              line: node.loc.start.line,
              column: node.loc.start.column + match.index + match[0].length,
            },
          },
        });
      }
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------


    return {
      // Check JSX text
      JSXText(node) {
        checkText(node, node.value);
      },
      // Check template literals in JSX
      JSXExpressionContainer(node) {
        if (node.expression && node.expression.type === 'TemplateLiteral') {
          node.expression.quasis.forEach((templateElement) => {
            checkText(node, templateElement.value.raw);
          });
        } else if (node.expression && node.expression.type === 'Literal') {
          checkText(node, node.expression.value);
        }
      },
    };
  },
};
