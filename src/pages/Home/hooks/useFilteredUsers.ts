import type { IUser } from "@features";
import { useDebounce } from "@hooks";
import { useState } from "react";
import useUserFilter from "./useUserFilter";

export default function useFilteredUsers({ users = [] }: { users?: IUser[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredUsers = useUserFilter(users, debouncedSearchTerm);

  return { filteredUsers, searchTerm, debouncedSearchTerm, setSearchTerm };
}
