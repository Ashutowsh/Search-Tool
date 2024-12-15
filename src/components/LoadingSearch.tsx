import { Skeleton } from '@/components/ui/skeleton';

export function LoadingSearch() {
  return (
    <div className="grid gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
}
