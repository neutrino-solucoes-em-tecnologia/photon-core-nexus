import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroSection from '@/components/HeroSection';
import FeaturedHighlights from '@/components/FeaturedHighlights';
import NewsFeed from '@/components/NewsFeed';
import AdSlot from '@/components/AdSlot';
import { useAdSense } from '@/hooks/use-adsense';
import { useScrollAds } from '@/hooks/use-scroll-ads';
import { useArticles } from '@/hooks/use-articles';

export default function Home() {
  const { isEnabled, clientId } = useAdSense();
  const visibleAds = useScrollAds(1500, 3); // 1 ad a cada 1500px, máximo 3 ads
  
  // Fetch featured articles from API
  const { data: articlesData, isLoading } = useArticles(1, 3);
  const featuredArticles = articlesData?.data || [];

  return (
    <div className="pb-8 w-full">
      {/* Ad 1 - Primeira dobra (sempre visível) */}
      {visibleAds >= 1 && (
        <RevealOnScroll>
          <div className="py-4 md:py-6 px-4 sm:px-6">
            <div className="not-prose">
              <AdSlot
                slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_01}
                format="auto"
                position={1}
                mockLabel="AD #1 - PRIMEIRA DOBRA"
              />
            </div>
          </div>
        </RevealOnScroll>
      )}

      {/* Hero Section */}
      <HeroSection />

        {/* Featured Highlights - Mais destaques */}
        <FeaturedHighlights />

      {/* Ad 2 - Aparece após scroll de 1500px */}
      {visibleAds >= 2 && (
        <RevealOnScroll>
          <div className="py-4 md:py-6 px-4 sm:px-6">
            <div className="not-prose">
              <AdSlot
                slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_02}
                format="auto"
                position={2}
                mockLabel="AD #2 - DINÂMICO (1500px)"
              />
            </div>
          </div>
        </RevealOnScroll>
      )}

        {/* News Feed - Feed de Notícias */}
        <RevealOnScroll>
          <NewsFeed />
        </RevealOnScroll>

        {/* Featured Articles */}
        <RevealOnScroll>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-3xl font-bold">Destaques da Semana</h2>
              <Button variant="ghost" asChild className="hover-glow text-sm md:text-base">
                <Link to="/categoria/tecnologia">
                  <span className="hidden sm:inline">Ver mais</span>
                  <span className="sm:hidden">Mais</span>
                  <ArrowRight className="ml-1 md:ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-full">
              {isLoading ? (
                // Skeleton loading state
                Array(3).fill(null).map((_, index) => (
                  <RevealOnScroll key={`skeleton-${index}`} delay={index * 150}>
                    <ArticleCardSkeleton />
                  </RevealOnScroll>
                ))
              ) : (
                // Actual articles
                featuredArticles.map((article, index) => {
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
                    <RevealOnScroll key={article.slug} delay={index * 150}>
                      <ArticleCard 
                        slug={article.slug}
                        title={article.title}
                        excerpt={article.description || ''}
                        image={article.image_url || ''}
                        category={article.category?.name || 'Geral'}
                        readTime={`${readTime} min`}
                        date={formattedDate}
                      />
                    </RevealOnScroll>
                  );
                })
              )}
            </div>
          </section>
        </RevealOnScroll>

        {/* Ad 3 - Aparece após scroll de 3000px */}
        {visibleAds >= 3 && (
          <RevealOnScroll>
            <div className="py-4 md:py-6 px-4 sm:px-6">
              <div className="not-prose">
                <AdSlot
                  slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_03}
                  format="auto"
                  position={3}
                  mockLabel="AD #3 - DINÂMICO (3000px)"
                />
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Newsletter CTA */}
        <RevealOnScroll>
          <section className="py-8 md:py-12 px-4 sm:px-6">
            <div className="rounded-xl md:rounded-2xl hero-gradient-rich p-6 md:p-12 text-center text-white shadow-xl md:shadow-2xl relative overflow-hidden w-full max-w-full">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Fique por dentro das novidades</h2>
                <p className="text-sm md:text-lg mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
                  Receba análises exclusivas e as principais tendências direto no seu email.
                </p>
                <Button size="lg" variant="secondary" asChild className="hover-glow animate-pulse hover:animate-none w-full sm:w-auto">
                  <Link to="/fale-conosco">
                    <span className="hidden sm:inline">Assinar Newsletter Gratuita</span>
                    <span className="sm:hidden">Assinar Newsletter</span>
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </RevealOnScroll>
    </div>
  );
}
