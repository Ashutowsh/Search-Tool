'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/api/search?query=${query}`);
      setResults(data.results);
      // Navigate to the product/[query] route to display the results
      router.push(`/product/${query}`);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center">Search Tool</h1>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 p-2 rounded-l-md w-2/3"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </header>
      {/* Results displayed here */}
      <main>
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item: any) => (
              <div
                key={item.id}
                className="border p-4 rounded-md shadow-md hover:shadow-lg transition"
                onClick={() => router.push(`/product/${item.query}`)} // Navigate dynamically
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.summary}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </main>
    </div>
  );
}
