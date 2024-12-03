// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * (60 * 1000) } },
  // staletime = 60 seconds, gcTime = 10 minutes
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </QueryClientProvider>
);
