interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="bg-red-50 border border-red-200 rounded-md p-6 max-w-2xl mx-auto">
        <i className="fas fa-exclamation-circle text-red-500 text-3xl mb-3"></i>
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to Load News</h3>
        <p className="text-red-700 mb-4">
          We're having trouble connecting to our servers. Please check your internet connection or try again later.
        </p>
        <button 
          className="bg-nyt-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
          onClick={onRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
