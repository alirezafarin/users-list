import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  HydrationBoundary,
  dehydrate,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { AppRouter } from "./Router";
import { createQueryClient } from "./queryClient";
import { ApiKeys, UserService } from "@features";

type TPrefetchHandler = (
  client: QueryClient,
  match: RegExpMatchArray
) => Promise<void>;

interface IServerRoute {
  pattern: RegExp;
  fetcher: TPrefetchHandler;
  name: string;
}

const SERVER_ROUTES: IServerRoute[] = [
  {
    name: "Home Page",
    pattern: /^\/?$/, // Matches "/" or ""
    fetcher: async (client) => {
      await client.prefetchQuery({
        queryKey: [ApiKeys.USERS],
        queryFn: UserService.getAll,
      });
    },
  },
  {
    name: "User Details",
    pattern: /^\/user\/(\d+)\/?$/, // Matches "/user/123" capturing ID
    fetcher: async (client, match) => {
      const userId = match[1];
      await client.prefetchQuery({
        queryKey: [ApiKeys.USER, userId],
        queryFn: () => UserService.getById(userId),
      });
    },
  },
];

const getCleanPath = (url: string): string => {
  const [path] = url.split("?");
  // Remove trailing slash if path length > 1
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
};

const prefetchDataForUrl = async (client: QueryClient, url: string) => {
  const path = getCleanPath(url);

  for (const route of SERVER_ROUTES) {
    const match = path.match(route.pattern);
    if (match) {
      console.log(`Server: Prefetching data for ${route.name}...`);
      await route.fetcher(client, match);
      return;
    }
  }
};

export async function render(url: string) {
  const queryClient = createQueryClient();

  await prefetchDataForUrl(queryClient, url);

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
