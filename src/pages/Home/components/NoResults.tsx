interface INoResultsProps {
  term: string;
  onClear: () => void;
}

const NoResults = ({ term, onClear }: INoResultsProps) => {
  return (
    <div className="text-center py-12 animate-fade-in bg-slate-50 rounded-2xl border border-dashed border-slate-300">
      <div className="text-4xl mb-4">🔍</div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        No users found for "{term}"
      </h3>
      <p className="text-slate-500 mb-6 max-w-xs mx-auto">
        We couldn't find any users matching your search. Try a different name or
        email.
      </p>
      <button
        onClick={onClear}
        className="px-5 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        Clear Search
      </button>
    </div>
  );
};

export default NoResults;
