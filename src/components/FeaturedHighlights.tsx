import { useArticles } from '@/hooks/use-articles';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';

export default function FeaturedHighlights() {
  const { data: articlesData, isLoading } = useArticles(1, 4);
  const highlights = articlesData?.data || [];

  return (
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Mais Destaques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-full">
        {isLoading ? (
          // Skeleton loading state
          Array(4).fill(null).map((_, index) => (
            <ArticleCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          highlights.map((article) => {
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
              <ArticleCard 
                key={article.slug}
                slug={article.slug}
                title={article.title}
                excerpt={article.description || ''}
                image={article.image_url || ''}
                category={article.category?.name || 'Geral'}
                readTime={`${readTime} min`}
                date={formattedDate}
              />
            );
          })
        )}
      </div>
    </section>
  );
}
