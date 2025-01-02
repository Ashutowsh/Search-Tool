import axios from 'axios';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { query: string } }) {
  try {
    // Fetch search results dynamically based on the query parameter
    const { data } = await axios.get(`/api/search?query=${params.query}`);

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Search Results for: "{params.query}"</h1>
        {data.results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((item: any) => (
              <div
                key={item.id}
                className="border p-4 rounded-md shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}
