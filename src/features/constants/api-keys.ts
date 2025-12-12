export const ApiKeys = {
  USERS: "USERS",
  USER: "USER",
} as const;

export type ApiKeys = (typeof ApiKeys)[keyof typeof ApiKeys];
