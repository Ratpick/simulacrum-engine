// src/pages/_error.tsx
import React from 'react';

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div style={{ color: "#D8000C", background: "#FFBABA", padding: "2rem" }}>
      <h1>Oops! An error occurred.</h1>
      <p>
        {statusCode
          ? `Server returned status code ${statusCode}`
          : "An unexpected error has occurred."}
      </p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;