"use client"

import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { LoadingSearch } from '@/components/LoadingSearch';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import { useState } from 'react';

export default function HomePage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch results');
      const data = await response.json();
      setResults(data.results);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Semantic Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-8">
        {loading && <LoadingSearch />}
        {!loading && error && <ErrorDisplay message={error} />}
        {!loading && <SearchResults results={results} />}
      </div>
    </main>
  );
}

