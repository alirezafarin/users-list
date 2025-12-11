import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchUsers } from "../api";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return <div className="p-10 text-center">Loading users...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">Error loading users</div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((user) => (
          <Link
            to={`/user/${user.id}`}
            key={user.id}
            className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition"
          >
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
              {user.name}
            </h5>
            <p className="font-normal text-gray-700">@{user.username}</p>
            <p className="font-normal text-sm text-gray-500 mt-2">
              {user.email}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
