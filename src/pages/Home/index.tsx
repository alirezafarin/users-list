import { PageLayout } from "@components";
import {
  HomeError,
  HomeSkeleton,
  NoResults,
  SearchBar,
  UserItem,
} from "./components";
import { useFetchUsers, useFilteredUsers } from "./hooks";

export default function Home() {
  const { data: users, refetch, isLoading, isError } = useFetchUsers();
  const { filteredUsers, searchTerm, debouncedSearchTerm, setSearchTerm } =
    useFilteredUsers({
      users,
    });

  if (isLoading) return <HomeSkeleton />;
  if (isError) return <HomeError retry={() => refetch()} />;

  return (
    <PageLayout title="User Directory">
      <div className="flex justify-center md:justify-start">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by name, username or email..."
        />
      </div>
      <div className="animate-fade-in min-h-[400px]">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredUsers.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <NoResults
            term={debouncedSearchTerm}
            onClear={() => setSearchTerm("")}
          />
        )}
      </div>
    </PageLayout>
  );
}
