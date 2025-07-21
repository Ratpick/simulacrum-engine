import React from 'react';

const TestMarkdown = () => {
  return (
    <div>
      <h2>Test Markdown Formatting</h2>
      
      <p>This is a **bold** statement using Markdown syntax.</p>
      <p>This is an *italic* statement using Markdown syntax.</p>
      <p>This is `code` using backticks.</p>
      
      <p>This is a <strong>bold</strong> statement using HTML.</p>
      <p>This is an <em>italic</em> statement using HTML.</p>
      <p>This is <code>code</code> using HTML.</p>
      
      <p>This is a <span className="font-bold">bold</span> statement using Tailwind.</p>
      <p>This is an <span className="italic">italic</span> statement using Tailwind.</p>
      <p>This is <span className="font-mono">code</span> using Tailwind.</p>
    </div>
  );
};

export default TestMarkdown;
