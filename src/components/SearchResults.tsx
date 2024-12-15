import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SearchResults({ results }: { results: Array<{ id: string; title: string; description: string }> }) {
  return (
    <div className="grid gap-4">
      {results.map((result) => (
        <Card key={result.id}>
          <CardHeader>
            <CardTitle>{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
