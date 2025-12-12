import { ApiKeys, UserService } from "@features";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useFetchUserDetails() {
  const { id } = useParams<{ id: string }>();

  return useQuery({
    queryKey: [ApiKeys.USER, id],
    queryFn: () => UserService.getById(id!),
    enabled: !!id,
  });
}
