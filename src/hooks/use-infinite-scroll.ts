import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  loadMore: () => Promise<void> | void;
  hasMore: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll({
  loadMore,
  hasMore,
  threshold = 0.5,
  rootMargin = '200px',
}: UseInfiniteScrollOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      
      if (target.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        
        try {
          await loadMore();
        } catch (error) {
          console.error('[Infinite Scroll] Erro ao carregar mais itens:', error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    const element = loaderRef.current;
    
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [handleObserver, threshold, rootMargin]);

  return { loaderRef, isLoading };
}
