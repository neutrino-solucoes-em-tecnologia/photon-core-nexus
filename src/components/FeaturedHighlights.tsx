import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/use-articles';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedHighlights() {
  const { data: articlesData, isLoading } = useArticles(1, 4);
  const highlights = articlesData?.data || [];

  return (
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Mais Destaques</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
        {isLoading ? (
          // Skeleton loading state
          Array(4).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full max-w-full">
              <Skeleton className="w-full aspect-video rounded-md mb-2 md:mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))
        ) : (
          highlights.map((article) => (
            <article key={article.id} className="group w-full max-w-full">
              <Link to={`/artigo/${article.slug}`}>
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-md mb-2 md:mb-3 aspect-video bg-muted">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.image_alt || article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                      <span className="text-4xl font-bold opacity-20">
                        {article.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {article.category && (
                    <span className="absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded uppercase tracking-wide">
                      {article.category.name}
                    </span>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-xs md:text-sm lg:text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-3">
                  {article.title}
                </h3>
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
