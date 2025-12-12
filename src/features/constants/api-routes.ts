export const ApiRoutes = {
  USERS: "/users",
} as const;

export type ApiRoutes = (typeof ApiRoutes)[keyof typeof ApiRoutes];
