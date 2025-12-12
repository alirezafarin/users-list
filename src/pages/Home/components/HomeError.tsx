import { PageLayout } from "@components";
import type { FC } from "react";

interface IHomeErrorProps {
  retry: () => void;
}

const HomeError: FC<IHomeErrorProps> = ({ retry }) => {
  return (
    <PageLayout title="User Directory">
      <div className="bg-red-50 border border-red-100 rounded-2xl p-8 md:p-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4 text-2xl">
          ⚠️
        </div>
        <h3 className="text-lg font-bold text-red-800 mb-2">
          Unable to load users
        </h3>
        <p className="text-red-600 mb-6 max-w-sm mx-auto">
          We encountered a problem fetching the user directory. This might be a
          network issue.
        </p>
        <button
          onClick={retry}
          className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 active:scale-95 transition-all"
        >
          Try Again
        </button>
      </div>
    </PageLayout>
  );
};

export default HomeError;
