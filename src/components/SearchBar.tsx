import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; 

export function SearchBar({
  onSearch,
  value,
  onChange,
}: {
  onSearch: (query: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const handleSearch = () => {
    onSearch(value); 
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search here..."
        value={value}
        onChange={onChange} 
        className="flex-1"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
