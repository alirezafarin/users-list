import { PageLayout } from "@components";

const HomeSkeleton = () => {
  return (
    <PageLayout title="User Directory">
      <div className="h-12 w-full max-w-md bg-slate-200 rounded-xl mb-8 animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-56 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col justify-between animate-pulse"
          >
            <div>
              <div className="h-6 w-3/4 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-1/3 bg-slate-200 rounded" />
            </div>

            <div className="space-y-3 mt-4">
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-50">
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default HomeSkeleton;
