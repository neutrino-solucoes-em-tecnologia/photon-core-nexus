import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden border-muted/50 bg-card/50 backdrop-blur-sm">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />
      
      <CardHeader className="space-y-3">
        {/* Title skeleton - 2 lines */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Excerpt skeleton - 3 lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* Date skeleton */}
        <Skeleton className="h-4 w-20" />
        {/* Read time skeleton */}
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}
