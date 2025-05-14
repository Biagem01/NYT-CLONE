export default function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="flex justify-center items-center space-x-2">
        <div className="loading-dot w-3 h-3 bg-nyt-gray rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-nyt-gray rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-nyt-gray rounded-full"></div>
      </div>
      <p className="mt-4 text-nyt-gray">Loading the latest news...</p>
    </div>
  );
}
