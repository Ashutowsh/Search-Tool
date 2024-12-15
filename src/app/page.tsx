"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      router.push(`/search-query?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Semantic Search</h1>
      <SearchBar
        onSearch={handleSearch} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </main>
  );
}
