import { PageLayout } from "@components";

const DetailsLoading = () => {
  return (
    <PageLayout>
      <div className="w-32 h-10 bg-slate-200 rounded-lg animate-pulse mb-6" />

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10 bg-slate-100 animate-pulse border-b border-slate-200">
          <div className="h-8 md:h-10 w-3/4 max-w-sm bg-slate-300 rounded-md mb-4" />
          <div className="h-6 w-32 bg-slate-300 rounded-md mb-8" />

          <div className="flex gap-3 mt-6">
            <div className="h-8 w-24 bg-slate-200 rounded-full" />
            <div className="h-8 w-32 bg-slate-200 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-10">
          <div className="space-y-6 animate-pulse">
            <div className="h-6 w-40 bg-slate-200 rounded mb-6" />

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4 pb-3 border-b border-slate-50"
                >
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                  <div className="h-5 w-full max-w-xs bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          <div className="animate-pulse">
            <div className="h-6 w-24 bg-slate-200 rounded mb-6" />
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-48">
              <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-slate-200 rounded mb-8" />
              <div className="h-3 w-1/4 bg-slate-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DetailsLoading;
