export const AppRoutes = {
  HOME: "/",
  USER_DETAIL: "/user/:id",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];
