import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({
  value,
  onChange,
  onSearch,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (query: string) => void;
}) {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Search here..."
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={() => onSearch(value)}>Search</Button>
    </div>
  );
}
