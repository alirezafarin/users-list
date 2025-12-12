import { PageLayout } from "@components";
import { ApiKeys, UserService } from "@features";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  DetailsBadge,
  DetailsError,
  DetailsItem,
  DetailsLoading,
  DetailsSection,
} from "./components";
import { AppRoutes } from "@constants";

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [ApiKeys.USER, id],
    queryFn: () => UserService.getById(id!),
    enabled: !!id,
  });

  if (isLoading) return <DetailsLoading />;

  if (isError || !user) return <DetailsError />;

  const { name, username, address, company, email, phone, website } = user;

  return (
    <PageLayout>
      <Link
        to={AppRoutes.HOME}
        className="inline-flex items-center px-4 py-3 mb-6 text-sm font-medium text-slate-500 bg-white rounded-lg shadow-sm hover:text-blue-600 hover:shadow-md transition-all active:scale-95 border border-slate-200"
      >
        &larr; <span className="ml-2">Back to List</span>
      </Link>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
          <p className="opacity-90 text-lg font-medium">@{username}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <DetailsBadge>{company.catchPhrase}</DetailsBadge>
            <DetailsBadge>{website}</DetailsBadge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
          <DetailsSection title="Contact Information">
            <DetailsItem label="Email" value={email} href={`mailto:${email}`} />
            <DetailsItem label="Phone" value={phone} href={`tel:${phone}`} />
            <DetailsItem label="Website" value={website} isExternal />
          </DetailsSection>

          <DetailsSection title="Address">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <p className="text-slate-700 font-medium">
                {address.street}, {address.suite}
              </p>
              <p className="text-slate-600 mt-1">{address.city}</p>
              <p className="text-slate-400 text-sm mt-4 font-mono">
                ZIP: {address.zipcode}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-4 text-xs text-slate-400">
                <span>Lat: {address.geo.lat}</span>
                <span>Lng: {address.geo.lng}</span>
              </div>
            </div>
          </DetailsSection>
        </div>
      </div>
    </PageLayout>
  );
}
