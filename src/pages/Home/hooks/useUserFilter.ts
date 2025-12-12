import type { IUser } from "@features";
import { useMemo } from "react";

const useUserFilter = (users: IUser[] | undefined, searchTerm: string) => {
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchTerm) return users;

    const lowerTerm = searchTerm.toLowerCase();

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowerTerm) ||
        user.username.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
      );
    });
  }, [users, searchTerm]);

  return filteredUsers;
};

export default useUserFilter;
