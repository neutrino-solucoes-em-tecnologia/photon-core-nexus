import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Clock, User, Calendar, Share2, BookmarkPlus, Tag, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ArticleCard from '@/components/ArticleCard';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingShare from '@/components/FloatingShare';
import RevealOnScroll from '@/components/RevealOnScroll';
import heroImage from '@/assets/hero-ai-1.jpg';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const article = {
  title: 'O Futuro da IA nas Empresas: Transformação Digital em 2025',
  subtitle: 'Como a inteligência artificial está revolucionando processos empresariais e criando novas oportunidades de negócio',
  image: heroImage,
  category: 'Tecnologia',
  categorySlug: 'tecnologia',
  author: 'Ana Silva',
  authorSlug: 'ana-silva',
  authorImage: 'https://i.pravatar.cc/150?img=5',
  authorBio: 'Jornalista especializada em tecnologia e inovação com mais de 10 anos de experiência',
  readTime: '8 min',
  date: '15 de Janeiro de 2025',
  publishedDate: '15 Jan 2025',
  updatedDate: 'Atualizado: 15 de Janeiro de 2025 às 14:30',
  comments: 24,
  tags: ['Inteligência Artificial', 'Transformação Digital', 'Empresas', 'Inovação'],
};

const relatedArticles = [
  {
    slug: 'quantum-computing',
    title: 'Computação Quântica: A Próxima Revolução Tecnológica',
    excerpt: 'Explore como a computação quântica promete resolver problemas impossíveis para computadores clássicos.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Pedro Costa',
    readTime: '12 min',
    date: '12 Jan 2025',
  },
  {
    slug: 'cybersecurity-trends',
    title: 'Tendências em Cibersegurança para Empresas',
    excerpt: 'As principais ameaças e soluções em segurança digital que toda empresa precisa conhecer.',
    image: businessImage,
    category: 'Tecnologia',
    author: 'Roberto Lima',
    readTime: '9 min',
    date: '10 Jan 2025',
  },
  {
    slug: 'blockchain-enterprise',
    title: 'Blockchain Além das Criptomoedas: Aplicações Empresariais',
    excerpt: 'Descubra como a tecnologia blockchain está transformando cadeias de suprimento e contratos inteligentes.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Mariana Santos',
    readTime: '10 min',
    date: '8 Jan 2025',
  },
  {
    slug: 'cloud-computing-2025',
    title: 'Cloud Computing em 2025: Multicloud e Edge Computing',
    excerpt: 'As estratégias de cloud que estão moldando o futuro da infraestrutura tecnológica empresarial.',
    image: businessImage,
    category: 'Tecnologia',
    author: 'Carlos Mendes',
    readTime: '11 min',
    date: '6 Jan 2025',
  },
  {
    slug: 'machine-learning-business',
    title: 'Machine Learning na Prática: Casos de Uso Reais',
    excerpt: 'Exemplos concretos de como empresas estão usando ML para otimizar operações e aumentar receita.',
    image: techImage,
    category: 'Negócios',
    author: 'Julia Ferreira',
    readTime: '14 min',
    date: '4 Jan 2025',
  },
  {
    slug: 'data-privacy-gdpr',
    title: 'Privacidade de Dados: LGPD e GDPR na Era Digital',
    excerpt: 'Entenda as regulamentações de proteção de dados e como sua empresa pode se adequar.',
    image: businessImage,
    category: 'Tecnologia',
    author: 'Fernando Souza',
    readTime: '10 min',
    date: '2 Jan 2025',
  },
];

export default function Artigo() {
  const { slug } = useParams();

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
    <div className="page-transition min-h-screen">
      <ScrollProgress />
      <FloatingShare />
      
      {/* Breadcrumbs */}
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary hover:underline font-semibold transition-colors">
              Início
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to={`/categoria/${article.categorySlug}`} className="text-primary hover:underline font-semibold transition-colors">
              {article.category}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Review</span>
          </nav>
        </div>
      </RevealOnScroll>

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Main Content */}
          <article className="w-full">
            
            {/* Article Header */}
            <RevealOnScroll>
              <header className="mb-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                  {article.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                  {article.subtitle}
                </p>

                {/* Byline */}
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/50">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                    />
                    <div>
                      <Link to={`/autor/${article.authorSlug}`} className="font-bold text-sm hover:text-primary transition-colors">
                        {article.author}
                      </Link>
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="text-xs text-muted-foreground">
                    {article.updatedDate}
                  </div>
                </div>
              </header>
            </RevealOnScroll>

            {/* ARTIGO-TITULO-01 */}
            <div className="mb-8 not-prose">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_TITULO_01}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>

            {/* Hero Image */}
            <RevealOnScroll>
              <div className="mb-8 rounded-xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-video object-cover"
                />
              </div>
            </RevealOnScroll>

            {/* Article Actions */}
            <RevealOnScroll>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.comments} comentários</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hover-lift">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                  <Button variant="outline" size="sm" className="hover-lift">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </RevealOnScroll>

            {/* Article Body - Editorial Style with Strategic Ad Placements */}
            <RevealOnScroll>
              <div className="prose prose-lg max-w-none article-content">
                <p className="lead text-xl mb-6 font-medium">
                  {article.subtitle}
                </p>
              </div>
            </RevealOnScroll>

            {/* ARTIGO-TITULO-02 - Após primeiro parágrafo */}
            <div className="mb-8 not-prose">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_TITULO_02}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>

            <RevealOnScroll>
              <div className="prose prose-lg max-w-none article-content">
                <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-4">A Revolução Silenciosa</h2>
                <p>
                  A inteligência artificial não é mais ficção científica. Ela está presente no dia a dia das empresas,
                  automatizando processos, oferecendo insights valiosos e criando experiências personalizadas para clientes.
                </p>
                <p>
                  De acordo com pesquisas recentes, mais de 70% das empresas globais já implementaram alguma forma de IA
                  em suas operações. Este número deve crescer exponencialmente nos próximos anos.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="prose prose-lg max-w-none article-content">
                <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">Aplicações Práticas</h2>
                <p>
                  As aplicações de IA vão desde chatbots inteligentes até sistemas complexos de análise preditiva.
                  Empresas estão usando machine learning para:
                </p>
                <ul className="space-y-2 my-6">
                  <li>Otimizar cadeias de suprimento</li>
                  <li>Personalizar experiências de usuário</li>
                  <li>Detectar fraudes em tempo real</li>
                  <li>Automatizar atendimento ao cliente</li>
                  <li>Prever tendências de mercado</li>
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="prose prose-lg max-w-none article-content">
                <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">Desafios e Oportunidades</h2>
                <p>
                  Apesar dos benefícios claros, a implementação de IA traz desafios significativos. Questões éticas,
                  privacidade de dados e a necessidade de upskilling das equipes são apenas algumas das barreiras
                  que empresas precisam superar.
                </p>
                <p>
                  No entanto, as oportunidades superam os desafios. Empresas que abraçam a transformação digital
                  com IA estão ganhando vantagem competitiva significativa em seus mercados.
                </p>
              </div>
            </RevealOnScroll>

            {/* ARTIGO-TITULO-03 */}
            <div className="mb-8 not-prose">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_ARTIGO_TITULO_03}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>

            <RevealOnScroll>
              <div className="prose prose-lg max-w-none article-content">
                <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4">O Futuro é Agora</h2>
                <p>
                  O futuro da IA nas empresas não é uma questão de "se", mas de "quando" e "como". Organizações
                  que começarem sua jornada de transformação digital hoje estarão melhor posicionadas para
                  prosperar no mercado cada vez mais competitivo e orientado por dados.
                </p>
              </div>
            </RevealOnScroll>

            {/* Tags */}
            <RevealOnScroll>
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/50">
                <Tag className="h-4 w-4 text-muted-foreground mr-2" />
                {article.tags.map((tag) => (
                  <Link key={tag} to={`/tag/${tag.toLowerCase().replace(/ /g, '-')}`}>
                    <Badge 
                      variant="outline" 
                      className="hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer hover-lift px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </RevealOnScroll>

            {/* Author Card */}
            <RevealOnScroll>
              <div className="mt-12 p-6 rounded-xl glass-effect border border-border/50 hover:border-primary/20 transition-all">
                <div className="flex items-start space-x-4">
                  <Link to={`/autor/${article.authorSlug}`}>
                    <img 
                      src={article.authorImage} 
                      alt={article.author}
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-border hover-lift transition-transform"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/autor/${article.authorSlug}`} className="font-bold text-lg mb-2 hover:text-primary transition-colors inline-block">
                      {article.author}
                    </Link>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {article.authorBio}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </article>
      </div>

      {/* Related Articles */}
      <section className="wide-container py-8 mt-8 lg:mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Leia Também</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-full">
            {relatedArticles.slice(0, 4).map((relatedArticle) => (
              <article key={relatedArticle.slug} className="group w-full max-w-full">
                <Link to={`/artigo/${relatedArticle.slug}`}>
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-md mb-3 aspect-video bg-muted">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                      {relatedArticle.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                    {relatedArticle.title}
                  </h3>
                </Link>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
