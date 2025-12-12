import { apiClient } from "@api";
import type { IUser } from "./types";
import { ApiRoutes } from "../constants";

export const UserService = {
  getAll: async (): Promise<IUser[]> => {
    const { data } = await apiClient.get<IUser[]>(ApiRoutes.USERS);
    return data;
  },

  getById: async (id: string): Promise<IUser> => {
    const { data } = await apiClient.get<IUser>(`${ApiRoutes.USERS}/${id}`);
    return data;
  },
};
