import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { fetchUserById } from "../api";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id!),
    enabled: !!id, // Only run if ID exists
  });

  if (isLoading)
    return <div className="p-10 text-center">Loading profile...</div>;
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">Error loading profile</div>
    );

  if (!user) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to List
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Contact
            </h3>
            <p className="text-gray-900">{user.email}</p>
            <p className="text-gray-900">{user.phone}</p>
            <p className="text-blue-500 hover:underline">{user.website}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Address
            </h3>
            <p className="text-gray-900">
              {user.address.street}, {user.address.suite}
            </p>
            <p className="text-gray-900">
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Company
            </h3>
            <p className="text-gray-900 font-semibold">{user.company.name}</p>
            <p className="text-gray-600 italic">"{user.company.catchPhrase}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
