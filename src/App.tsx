import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary";
import Root from "./routes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <Root />
          <ToastContainer limit={1} />
        </React.StrictMode>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
