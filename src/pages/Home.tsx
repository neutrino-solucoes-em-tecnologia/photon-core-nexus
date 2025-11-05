import { useState, useEffect } from 'react';
import { ArrowRight, Cpu, Lightbulb, TrendingUp, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/ArticleCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import heroImage from '@/assets/hero-photon.jpg';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const categories = [
  {
    name: 'Tecnologia',
    icon: Cpu,
    gradient: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
    href: '/categoria/tecnologia',
  },
  {
    name: 'Inovação',
    icon: Lightbulb,
    gradient: 'from-accent/20 to-accent/5',
    iconColor: 'text-accent',
    href: '/categoria/inovacao',
  },
  {
    name: 'Negócios',
    icon: TrendingUp,
    gradient: 'from-secondary/20 to-secondary/5',
    iconColor: 'text-secondary',
    href: '/categoria/negocios',
  },
  {
    name: 'Vídeos',
    icon: Video,
    gradient: 'from-primary/15 to-accent/10',
    iconColor: 'text-primary',
    href: '/categoria/videos',
  },
];

const featuredArticles = [
  {
    slug: 'futuro-ia-empresas',
    title: 'O Futuro da IA nas Empresas: Transformação Digital em 2025',
    excerpt: 'Como a inteligência artificial está revolucionando processos empresariais e criando novas oportunidades de negócio.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '8 min',
    date: '15 Jan 2025',
  },
  {
    slug: 'investimentos-sustentaveis',
    title: 'Investimentos Sustentáveis: A Nova Fronteira do Capital',
    excerpt: 'Entenda como ESG e sustentabilidade estão moldando o futuro dos investimentos globais.',
    image: businessImage,
    category: 'Negócios',
    author: 'Carlos Mendes',
    readTime: '6 min',
    date: '14 Jan 2025',
  },
  {
    slug: 'inovacao-blockchain',
    title: 'Blockchain Além das Criptomoedas: Casos de Uso Reais',
    excerpt: 'Descubra aplicações práticas da tecnologia blockchain em diversos setores da economia.',
    image: techImage,
    category: 'Inovação',
    author: 'Maria Santos',
    readTime: '10 min',
    date: '13 Jan 2025',
  },
];

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section with Parallax */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div 
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <img
            src={heroImage}
            alt="Photon Media"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 hero-gradient-rich opacity-80" />
        </div>
        
        <div className="relative wide-container py-20 md:py-32 z-10">
          <div className="max-w-2xl">
            <h1 className="mb-6 fade-in text-white drop-shadow-2xl">
              O núcleo que move o <span className="text-accent">universo</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed fade-in stagger-1 drop-shadow-lg">
              Conteúdo inteligente, análises profundas e as tendências que moldam o futuro.
              Bem-vindo ao ecossistema Photon Media.
            </p>
            <div className="flex gap-4 fade-in stagger-2">
              <Button size="lg" variant="secondary" asChild className="hover-glow">
                <Link to="/categoria/tecnologia">
                  Explorar Conteúdo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/sobre">
                  Sobre Nós
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <RevealOnScroll>
        <section className="wide-container py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Destaques da Semana</h2>
            <Button variant="ghost" asChild className="hover-glow">
              <Link to="/categoria/tecnologia">
                Ver mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <section className="wide-container py-16">
          <div className="rounded-2xl hero-gradient-rich p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-accent rounded-full blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Receba análises exclusivas e as principais tendências direto no seu email. Junte-se a milhares de leitores inteligentes.
              </p>
              <Button size="lg" variant="secondary" asChild className="hover-glow animate-pulse hover:animate-none">
                <Link to="/contato">
                  Assinar Newsletter Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
}
