import { useState } from 'react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import InfiniteScrollWithAds from '@/components/InfiniteScrollWithAds';
import ArticleCard from '@/components/ArticleCard';
import { Loader2 } from 'lucide-react';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

// Mock de dados de artigos
const generateMockArticles = (page: number, perPage: number = 12) => {
  return Array.from({ length: perPage }, (_, i) => ({
    slug: `article-${page}-${i}`,
    title: `Artigo ${page * perPage + i + 1}: Título Interessante sobre Tecnologia`,
    excerpt: `Descrição do artigo ${page * perPage + i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    image: i % 2 === 0 ? techImage : businessImage,
    category: i % 3 === 0 ? 'Tecnologia' : i % 3 === 1 ? 'Negócios' : 'Inovação',
    readTime: `${5 + (i % 5)} min`,
    date: `${15 - (i % 15)} Jan 2025`,
  }));
};

export default function InfiniteScrollExample() {
  const [articles, setArticles] = useState(generateMockArticles(0, 12));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    // Simula delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newArticles = generateMockArticles(page, 12);
    setArticles(prev => [...prev, ...newArticles]);
    setPage(prev => prev + 1);

    // Para o infinite scroll após 5 páginas (exemplo)
    if (page >= 4) {
      setHasMore(false);
    }
  };

  const { loaderRef, isLoading } = useInfiniteScroll({
    loadMore,
    hasMore,
    threshold: 0.8,
    rootMargin: '400px',
  });

  return (
    <div className="wide-container py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Feed Infinito com Ads Dinâmicos
        </h1>
        <p className="text-muted-foreground">
          Role para baixo e veja ads sendo carregados automaticamente a cada 6 artigos
        </p>
      </div>

      {/* Grid com Infinite Scroll + Ads */}
      <InfiniteScrollWithAds
        items={articles}
        renderItem={(article) => <ArticleCard {...article} />}
        itemsBetweenAds={6} // Ad a cada 6 artigos
        adSlot="1234567890" // Substitua pelo seu slot real
        adFormat="auto"
        containerClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        itemClassName=""
        adClassName="sm:col-span-2 lg:col-span-3" // Ad ocupa linha completa
      />

      {/* Loader para infinite scroll */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex items-center justify-center py-8 md:py-12"
        >
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Carregando mais artigos...</span>
            </div>
          )}
        </div>
      )}

      {/* Fim do feed */}
      {!hasMore && (
        <div className="text-center py-8 md:py-12">
          <p className="text-muted-foreground">
            Você chegou ao fim! 🎉
          </p>
        </div>
      )}
    </div>
  );
}
