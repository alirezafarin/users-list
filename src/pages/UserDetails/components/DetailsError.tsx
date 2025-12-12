import { PageLayout } from "@components";
import { Link } from "react-router-dom";

const DetailsError = () => {
  return (
    <PageLayout>
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">
          !
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
          User Not Found
        </h2>

        <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
          The user profile you are looking for might have been removed, or the
          link is incorrect.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg active:scale-95 touch-manipulation"
        >
          &larr; Return to Directory
        </Link>
      </div>
    </PageLayout>
  );
};

export default DetailsError;
