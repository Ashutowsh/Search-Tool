'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { LoadingSearch } from '@/components/LoadingSearch';
import { ErrorDisplay } from '@/components/ErrorDisplay';
import axios from 'axios';

export default function SearchResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const queryValue = searchParams.get('value') || '';
  const [query, setQuery] = useState(queryValue || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queryValue) {
      fetchResults(queryValue as string);
    }
  }, [queryValue]);

  const fetchResults = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/search`,
        {
          params: { q: searchQuery },
          headers: { 'Cache-Control': 'no-store' },
        }
      );
      setResults(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      router.push(`/query/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={handleSearch}
      />
      {loading && <LoadingSearch />}
      {error && <ErrorDisplay message={error} />}
      {!loading && !error && <SearchResults results={results} />}
    </div>
  );
}
