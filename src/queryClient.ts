import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR: We don't want to refetch immediately on the client
        staleTime: 1000 * 60,
      },
    },
  });
};
