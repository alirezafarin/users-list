import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  HydrationBoundary,
  dehydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppRouter } from "./Router";
import { createQueryClient } from "./queryClient";
import { ApiKeys, UserService } from "@features";

export async function render(url: string) {
  const queryClient = createQueryClient();
  const [path] = url.split("?");
  const cleanPath =
    path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

  if (cleanPath === "/") {
    console.log("Server: Prefetching users list...");
    await queryClient.prefetchQuery({
      queryKey: [ApiKeys.USERS],
      queryFn: UserService.getAll,
    });
  } else {
    const match = cleanPath.match(/^\/user\/(\d+)$/);
    if (match) {
      console.log(`Server: Prefetching user ${match[1]}...`);
      await queryClient.prefetchQuery({
        queryKey: [ApiKeys.USER, match[1]],
        queryFn: () => UserService.getById(match[1]),
      });
    }
  }

  const dehydratedState = dehydrate(queryClient);

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <StaticRouter location={url}>
            <AppRouter />
          </StaticRouter>
        </HydrationBoundary>
      </QueryClientProvider>
    </React.StrictMode>
  );

  return { html, dehydratedState };
}
