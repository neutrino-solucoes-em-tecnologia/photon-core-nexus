import { ArrowRight, Cpu, Lightbulb, TrendingUp, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/ArticleCard';
import heroImage from '@/assets/hero-photon.jpg';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const categories = [
  {
    name: 'Tecnologia',
    icon: Cpu,
    color: 'text-primary',
    href: '/categoria/tecnologia',
  },
  {
    name: 'Inovação',
    icon: Lightbulb,
    color: 'text-secondary',
    href: '/categoria/inovacao',
  },
  {
    name: 'Negócios',
    icon: TrendingUp,
    color: 'text-accent',
    href: '/categoria/negocios',
  },
  {
    name: 'Vídeos',
    icon: Video,
    color: 'text-primary',
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
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Photon Media"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
        </div>
        
        <div className="relative wide-container py-20 md:py-32">
          <div className="max-w-2xl fade-in">
            <h1 className="mb-6">
              O núcleo que move o <span className="text-gradient">universo</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Conteúdo inteligente, análises profundas e as tendências que moldam o futuro.
              Bem-vindo ao ecossistema Photon Media.
            </p>
            <Button size="lg" asChild>
              <Link to="/categoria/tecnologia">
                Explorar Conteúdo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="wide-container py-16">
        <h2 className="text-3xl font-bold mb-8">Explore por Categoria</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group p-6 rounded-lg border bg-card hover:shadow-lg transition-all"
            >
              <category.icon className={`h-8 w-8 mb-3 ${category.color}`} />
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="wide-container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Destaques da Semana</h2>
          <Button variant="ghost" asChild>
            <Link to="/categoria/tecnologia">
              Ver mais
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="wide-container py-16">
        <div className="rounded-2xl hero-gradient p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="text-lg mb-8 opacity-90">
            Receba análises exclusivas e as principais tendências direto no seu email.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contato">Assinar Newsletter</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
