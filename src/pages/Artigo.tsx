import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, Share2, BookmarkPlus, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ArticleCard from '@/components/ArticleCard';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingShare from '@/components/FloatingShare';
import RevealOnScroll from '@/components/RevealOnScroll';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const article = {
  title: 'O Futuro da IA nas Empresas: Transformação Digital em 2025',
  excerpt: 'Como a inteligência artificial está revolucionando processos empresariais e criando novas oportunidades de negócio.',
  image: techImage,
  category: 'Tecnologia',
  author: 'Ana Silva',
  authorBio: 'Jornalista especializada em tecnologia e inovação',
  readTime: '8 min',
  date: '15 de Janeiro de 2025',
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
];

export default function Artigo() {
  const { slug } = useParams();

  return (
    <div>
      <ScrollProgress />
      <FloatingShare />
      {/* Back Button */}
      <div className="wide-container py-6">
        <Button variant="ghost" asChild>
          <Link to="/categoria/tecnologia">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Hero Image */}
      <div className="wide-container">
        <div className="aspect-[21/9] rounded-xl overflow-hidden mb-8">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="editorial-container">
        {/* Header */}
        <RevealOnScroll>
          <header className="mb-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="mb-6">{article.title}</h1>
          
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="font-medium">{article.author}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} de leitura</span>
            </div>
          </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="hover-glow">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" className="hover-glow">
                <BookmarkPlus className="mr-2 h-4 w-4" />
                Salvar
              </Button>
            </div>
          </header>
        </RevealOnScroll>

        <Separator className="my-8" />

        {/* Article Body */}
        <RevealOnScroll>
          <div className="prose prose-lg max-w-none">
          <p className="lead text-xl text-muted-foreground mb-6">
            {article.excerpt}
          </p>

          <h2>A Revolução Silenciosa</h2>
          <p>
            A inteligência artificial não é mais ficção científica. Ela está presente no dia a dia das empresas,
            automatizando processos, oferecendo insights valiosos e criando experiências personalizadas para clientes.
          </p>
          <p>
            De acordo com pesquisas recentes, mais de 70% das empresas globais já implementaram alguma forma de IA
            em suas operações. Este número deve crescer exponencialmente nos próximos anos.
          </p>

          <h2>Aplicações Práticas</h2>
          <p>
            As aplicações de IA vão desde chatbots inteligentes até sistemas complexos de análise preditiva.
            Empresas estão usando machine learning para:
          </p>
          <ul>
            <li>Otimizar cadeias de suprimento</li>
            <li>Personalizar experiências de usuário</li>
            <li>Detectar fraudes em tempo real</li>
            <li>Automatizar atendimento ao cliente</li>
            <li>Prever tendências de mercado</li>
          </ul>

          <h2>Desafios e Oportunidades</h2>
          <p>
            Apesar dos benefícios claros, a implementação de IA traz desafios significativos. Questões éticas,
            privacidade de dados e a necessidade de upskilling das equipes são apenas algumas das barreiras
            que empresas precisam superar.
          </p>
          <p>
            No entanto, as oportunidades superam os desafios. Empresas que abraçam a transformação digital
            com IA estão ganhando vantagem competitiva significativa em seus mercados.
          </p>

          <h2>O Futuro é Agora</h2>
          <p>
            O futuro da IA nas empresas não é uma questão de "se", mas de "quando" e "como". Organizações
            que começarem sua jornada de transformação digital hoje estarão melhor posicionadas para
            prosperar no mercado cada vez mais competitivo e orientado por dados.
          </p>
          </div>
        </RevealOnScroll>

        {/* Tags */}
        <RevealOnScroll>
          <div className="flex flex-wrap gap-2 mt-12">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                {tag}
              </Badge>
            ))}
          </div>
        </RevealOnScroll>

        {/* Author Info */}
        <RevealOnScroll>
          <div className="mt-12 p-6 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors border border-transparent hover:border-primary/20">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                {article.author[0]}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{article.author}</h3>
                <p className="text-muted-foreground">{article.authorBio}</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Newsletter CTA */}
        <RevealOnScroll>
          <div className="mt-12 p-8 rounded-lg hero-gradient-rich text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent rounded-full blur-2xl" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Gostou deste artigo?</h3>
              <p className="mb-6 opacity-90">
                Receba análises exclusivas e conteúdo como este direto no seu email.
              </p>
              <Button variant="secondary" size="lg" asChild className="hover-glow animate-pulse hover:animate-none">
                <Link to="/contato">
                  Assinar Newsletter Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </article>

      {/* Related Articles */}
      <section className="wide-container py-16 mt-16 border-t">
        <h2 className="text-3xl font-bold mb-8">Leia Também</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
}
