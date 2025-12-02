import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/use-articles';
import { Skeleton } from '@/components/ui/skeleton';
import AdSlot from '@/components/AdSlot';

export default function NewsFeed() {
  const { data: articlesData, isLoading } = useArticles(1, 6);
  const newsArticles = articlesData?.data || [];

  useEffect(() => {
    try {
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (err) {
      if (import.meta.env.VITE_SHOW_ADSENSE_ERRORS === 'true') {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Últimas Notícias</h2>
      
      <div className="w-full max-w-full space-y-4 md:space-y-6">
        {isLoading ? (
          // Skeleton loading state
          Array(6).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`} className="grid grid-cols-[120px_1fr] md:grid-cols-[280px_1fr] gap-4 pb-4 md:pb-6 border-b border-border/50">
              <Skeleton className="w-full aspect-video rounded-md" />
              <div className="flex flex-col justify-center space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))
        ) : (
          newsArticles.map((article, index) => {
            // Calculate read time from paragraphs
            const readTime = article.paragraphs ? (() => {
              const wordCount = article.paragraphs.reduce((total: number, p: any) => {
                const text = p.content.replace(/<[^>]*>/g, '');
                return total + text.split(/\s+/).length;
              }, 0);
              return Math.max(1, Math.ceil(wordCount / 200));
            })() : 5;
            
            const formattedDate = article.published_at
              ? new Date(article.published_at).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              : '';
            
            return (
              <div key={article.id}>
                <article className="group grid grid-cols-[120px_1fr] md:grid-cols-[280px_1fr] gap-4 pb-4 md:pb-6 border-b border-border/50">
                  {/* Thumbnail */}
                  <Link 
                    to={`/artigo/${article.slug}`}
                    className="relative overflow-hidden rounded-md aspect-video bg-muted/30 flex-shrink-0"
                  >
                    <img
                      src={article.image_url || ''}
                      alt={article.image_alt || article.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col justify-center min-h-0">
                    {/* Category Badge */}
                    {article.category && (
                      <Link 
                        to={`/categoria/${article.category.slug}`}
                        className="text-xs font-bold uppercase tracking-wide text-primary hover:underline mb-2"
                      >
                        {article.category.name}
                      </Link>
                    )}

                    {/* Title */}
                    <h3 className="mb-2">
                      <Link 
                        to={`/artigo/${article.slug}`}
                        className="text-lg md:text-xl font-bold leading-tight text-foreground hover:text-foreground/90 transition-colors line-clamp-2"
                      >
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt - Hidden on mobile */}
                    <p className="hidden md:block text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                      {article.description || ''}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{formattedDate}</span>
                    </div>
                  </div>
                </article>

                {/* HOME-DISPLAY-03 - Ad after first item and before second-to-last item */}
                {(index === 0 || index === newsArticles.length - 2) && (
                  <div className="py-4 md:py-6 border-b border-border/50">
                    <div className="not-prose">
                      <AdSlot
                        slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_03}
                        format="auto"
                        position={3}
                        mockLabel="NEWS FEED AD"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
