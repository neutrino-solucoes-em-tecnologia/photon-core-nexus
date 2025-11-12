import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, TrendingUp, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ArticleCard from '@/components/ArticleCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const articles = [
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
    slug: 'empreendedorismo-digital',
    title: 'Empreendedorismo Digital: Estratégias para 2025',
    excerpt: 'Descubra as melhores práticas e ferramentas para construir negócios digitais de sucesso.',
    image: businessImage,
    category: 'Negócios',
    author: 'Julia Martins',
    readTime: '7 min',
    date: '11 Jan 2025',
  },
  {
    slug: 'cybersecurity-trends',
    title: 'Tendências em Cibersegurança para Empresas',
    excerpt: 'As principais ameaças e soluções em segurança digital que toda empresa precisa conhecer.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Roberto Lima',
    readTime: '9 min',
    date: '10 Jan 2025',
  },
  {
    slug: 'gestao-remota',
    title: 'Gestão de Equipes Remotas: Práticas Essenciais',
    excerpt: 'Como liderar times distribuídos com eficiência e manter a cultura organizacional forte.',
    image: businessImage,
    category: 'Negócios',
    author: 'Fernanda Souza',
    readTime: '5 min',
    date: '9 Jan 2025',
  },
];

const popularArticles = [
  {
    position: 1,
    title: 'O Futuro da IA nas Empresas',
    slug: 'futuro-ia-empresas',
    views: '12.5k',
    readTime: '8 min',
  },
  {
    position: 2,
    title: 'Investimentos Sustentáveis',
    slug: 'investimentos-sustentaveis',
    views: '9.2k',
    readTime: '6 min',
  },
  {
    position: 3,
    title: 'Computação Quântica',
    slug: 'quantum-computing',
    views: '8.1k',
    readTime: '12 min',
  },
  {
    position: 4,
    title: 'Empreendedorismo Digital',
    slug: 'empreendedorismo-digital',
    views: '7.8k',
    readTime: '7 min',
  },
  {
    position: 5,
    title: 'Cibersegurança Empresarial',
    slug: 'cybersecurity-trends',
    views: '6.9k',
    readTime: '9 min',
  },
];

const categories = {
  tecnologia: {
    title: 'Tecnologia',
    description: 'As últimas tendências e inovações do mundo tech',
  },
  negocios: {
    title: 'Negócios',
    description: 'Estratégias, investimentos e o futuro dos negócios',
  },
  inovacao: {
    title: 'Inovação',
    description: 'Ideias disruptivas e o futuro que está sendo construído',
  },
};

export default function Categoria() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories[slug as keyof typeof categories] || categories.tecnologia;
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <div className="page-transition">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/30 via-background to-muted/20 border-b border-border/50">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        <div className="wide-container py-16 md:py-24 relative z-10">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-foreground/90 text-background hover:bg-foreground text-sm px-3 py-1">
                Categoria
              </Badge>
              <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {category.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="wide-container py-12">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main Content */}
          <div>
            {/* Filter Bar */}
            <RevealOnScroll>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <p className="text-muted-foreground font-medium">
                    <span className="text-foreground font-bold">{articles.length}</span> artigos encontrados
                  </p>
                </div>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="hover-lift-enhanced shadow-sm hover:shadow-md">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filtros
                      {selectedFilters.length > 0 && (
                        <Badge className="ml-2 bg-primary/20 text-primary border-0 h-5 min-w-5 flex items-center justify-center px-1.5">
                          {selectedFilters.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="slide-in-right">
                    <SheetHeader>
                      <SheetTitle>Filtros Avançados</SheetTitle>
                      <SheetDescription>
                        Refine sua busca por conteúdo específico
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Subcategorias</h4>
                        <div className="space-y-3">
                          {['IA & Machine Learning', 'Cloud Computing', 'DevOps', 'Segurança'].map((item) => (
                            <div key={item} className="flex items-center space-x-3 group">
                              <Checkbox id={item} className="transition-all" />
                              <label 
                                htmlFor={item} 
                                className="text-sm cursor-pointer group-hover:text-foreground transition-colors flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border-t border-border/50 pt-6 space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Tempo de Leitura</h4>
                        <div className="space-y-3">
                          {['Menos de 5 min', '5-10 min', 'Mais de 10 min'].map((item) => (
                            <div key={item} className="flex items-center space-x-3 group">
                              <Checkbox id={item} className="transition-all" />
                              <label 
                                htmlFor={item} 
                                className="text-sm cursor-pointer group-hover:text-foreground transition-colors flex-1"
                              >
                                {item}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </RevealOnScroll>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6 stagger-fade-in">
              {articles.map((article, index) => (
                <RevealOnScroll key={article.slug} delay={index * 100}>
                  <ArticleCard {...article} />
                </RevealOnScroll>
              ))}
            </div>

            {/* Load More */}
            <RevealOnScroll>
              <div className="mt-12 text-center">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="hover-lift-enhanced shadow-md hover:shadow-lg min-w-[200px]"
                >
                  Carregar Mais Artigos
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Sidebar - Popular Articles */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <RevealOnScroll>
                <Card className="p-6 glass-effect">
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-lg">Mais Populares</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {popularArticles.map((article) => (
                      <a 
                        key={article.slug}
                        href={`/artigo/${article.slug}`}
                        className="group block p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 hover-lift"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className={`
                              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                              ${article.position === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                            `}>
                              {article.position}
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {article.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>
              </RevealOnScroll>

              {/* Ad Space Placeholder */}
              <RevealOnScroll delay={200}>
                <Card className="p-6 glass-effect bg-muted/30 border-dashed">
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <div className="w-full aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                      <span className="text-xs">Espaço Publicitário</span>
                    </div>
                    <p className="text-xs">300 x 300</p>
                  </div>
                </Card>
              </RevealOnScroll>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
