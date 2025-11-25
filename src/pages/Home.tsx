import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/ArticleCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroSection from '@/components/HeroSection';
import FeaturedHighlights from '@/components/FeaturedHighlights';
import NewsFeed from '@/components/NewsFeed';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const featuredArticles = [
  {
    slug: 'futuro-ia-empresas',
    title: 'O Futuro da IA nas Empresas: Transformação Digital em 2025',
    excerpt: 'Como a inteligência artificial está revolucionando processos empresariais e criando novas oportunidades de negócio.',
    image: techImage,
    category: 'Tecnologia',
    readTime: '8 min',
    date: '15 Jan 2025',
  },
  {
    slug: 'investimentos-sustentaveis',
    title: 'Investimentos Sustentáveis: A Nova Fronteira do Capital',
    excerpt: 'Entenda como ESG e sustentabilidade estão moldando o futuro dos investimentos globais.',
    image: businessImage,
    category: 'Negócios',
    readTime: '6 min',
    date: '14 Jan 2025',
  },
  {
    slug: 'inovacao-blockchain',
    title: 'Blockchain Além das Criptomoedas: Casos de Uso Reais',
    excerpt: 'Descubra aplicações práticas da tecnologia blockchain em diversos setores da economia.',
    image: techImage,
    category: 'Inovação',
    readTime: '10 min',
    date: '13 Jan 2025',
  },
];

export default function Home() {
  useEffect(() => {
    try {
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (err) {
      if (import.meta.env.VITE_SHOW_ADSENSE_ERRORS === 'true') {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <div className="pb-8 w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* HOME-DISPLAY-01 - Ad below Hero Section */}
      <RevealOnScroll>
        <div className="py-4 md:py-6 px-4 sm:px-6">
          <div className="not-prose">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
              data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_01}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </RevealOnScroll>

        {/* Featured Highlights - Mais destaques */}
        <FeaturedHighlights />

      {/* HOME-DISPLAY-02 - Ad after Featured Highlights */}
      <RevealOnScroll>
        <div className="py-4 md:py-6 px-4 sm:px-6">
          <div className="not-prose">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
              data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_02}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </RevealOnScroll>

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
              {featuredArticles.map((article, index) => (
                <RevealOnScroll key={article.slug} delay={index * 150}>
                  <ArticleCard {...article} />
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

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
