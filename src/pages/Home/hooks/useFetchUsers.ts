import { ApiKeys, UserService } from "@features";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUsers() {
  return useQuery({
    queryKey: [ApiKeys.USERS],
    queryFn: UserService.getAll,
  });
}
