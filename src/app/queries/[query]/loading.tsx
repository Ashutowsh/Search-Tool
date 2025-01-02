export default function Loading() {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="bg-gray-300 h-10 w-1/3 mb-4 rounded"></div>
      <div className="bg-gray-200 h-6 w-2/3 mb-2 rounded"></div>
      <div className="bg-gray-200 h-6 w-1/2 mb-2 rounded"></div>
      <div className="bg-gray-300 h-10 w-1/4 mt-6 rounded"></div>
    </div>
  );
}
