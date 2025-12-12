import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./Router";
import { createQueryClient } from "./queryClient";
import "./index.css";

const queryClient = createQueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dehydratedState = (window as any).__REACT_QUERY_STATE__;

const container = document.getElementById("root") as HTMLElement;

ReactDOM.hydrateRoot(
  container,
  <QueryClientProvider client={queryClient}>
    <HydrationBoundary state={dehydratedState}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </HydrationBoundary>
  </QueryClientProvider>
);
