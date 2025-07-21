import React from 'react';

// This is a test component to verify our ESLint rules
const TestComponent = () => {
  return (
    <div>
      {/* These should trigger ESLint errors */}
      <p>This is **bold** text that should be caught</p>
      <p>This is *italic* text that should be caught</p>
      <p>This is `code` that should be caught</p>
      
      {/* These are the correct alternatives */}
      <p>This is <strong>bold</strong> text that is correct</p>
      <p>This is <em>italic</em> text that is correct</p>
      <p>This is <code>code</code> that is correct</p>
      
      {/* Tailwind alternatives */}
      <p>This is <span className="font-bold">bold</span> with Tailwind</p>
      <p>This is <span className="italic">italic</span> with Tailwind</p>
      <p>This is <span className="font-mono">code</span> with Tailwind</p>
    </div>
  );
};

export default TestComponent;
