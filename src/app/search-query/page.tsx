"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";  
import { SearchBar } from "@/components/SearchBar"; 
import { SearchResults } from "@/components/SearchResults"; 
import { LoadingSearch } from "@/components/LoadingSearch"; 
import { ErrorDisplay } from "@/components/ErrorDisplay"; 
import { useRouter } from "next/navigation"; 

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q"); 

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(query || ""); 

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`/api/search`, {
          params: { query },
        });

        if (response.status !== 200) throw new Error("Failed to fetch results");

        setResults(response.data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim()) {
      setSearchQuery(newQuery);
      router.push(`/search-query?q=${encodeURIComponent(newQuery)}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Search Results</h1>

      <SearchBar onSearch={handleSearch} value={searchQuery} onChange={handleInputChange} />

      {loading && <LoadingSearch />}
      {!loading && error && <ErrorDisplay message={error} />}
      {!loading && !error && <SearchResults results={results} />}
    </main>
  );
}
