import { useQuery } from "@tanstack/react-query";
import { HomeError, HomeSkeleton, UserItem } from "./components";
import { PageLayout } from "@components";
import { ApiKeys, UserService } from "@features";

export default function Home() {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [ApiKeys.USERS],
    queryFn: UserService.getAll,
  });

  if (isLoading) return <HomeSkeleton />;
  if (isError) return <HomeError retry={() => refetch()} />;

  return (
    <PageLayout title="User Directory">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 animate-fade-in">
        {users?.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    </PageLayout>
  );
}
