import React from "react";
import { ErrorBoundary } from "react-error-boundary";

interface TProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: TProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error?.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function CustomErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default CustomErrorBoundary;
