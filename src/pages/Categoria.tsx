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
import RevealOnScroll from '@/components/RevealOnScroll';
import DynamicAd from '@/components/DynamicAd';
import ContentWithViewportAds from '@/components/ContentWithViewportAds';
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
  {
    slug: 'blockchain-empresarial',
    title: 'Blockchain Empresarial: Aplicações Práticas',
    excerpt: 'Descubra como grandes empresas estão usando blockchain para otimizar processos e reduzir custos.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '10 min',
    date: '8 Jan 2025',
  },
  {
    slug: 'marketing-digital-2025',
    title: 'Marketing Digital em 2025: Tendências e Estratégias',
    excerpt: 'As principais mudanças no marketing digital e como adaptar sua estratégia para o futuro.',
    image: businessImage,
    category: 'Negócios',
    author: 'Carlos Mendes',
    readTime: '7 min',
    date: '7 Jan 2025',
  },
  {
    slug: 'automacao-industrial',
    title: 'Automação Industrial 4.0: A Revolução nas Fábricas',
    excerpt: 'Como IoT e IA estão transformando a manufatura e criando fábricas inteligentes.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Pedro Costa',
    readTime: '11 min',
    date: '6 Jan 2025',
  },
  {
    slug: 'startup-unicornios',
    title: 'O Caminho para o Unicórnio: Lições de Startups Bilionárias',
    excerpt: 'Estratégias e insights de fundadores que transformaram suas startups em unicórnios.',
    image: businessImage,
    category: 'Negócios',
    author: 'Julia Martins',
    readTime: '9 min',
    date: '5 Jan 2025',
  },
  {
    slug: 'cloud-computing-multicloud',
    title: 'Estratégias Multicloud: Otimizando Infraestrutura',
    excerpt: 'Por que empresas estão adotando múltiplas plataformas de nuvem e como gerenciá-las.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Roberto Lima',
    readTime: '8 min',
    date: '4 Jan 2025',
  },
  {
    slug: 'rh-digital',
    title: 'RH Digital: Transformando a Gestão de Pessoas',
    excerpt: 'Como a tecnologia está revolucionando o recrutamento, treinamento e retenção de talentos.',
    image: businessImage,
    category: 'Negócios',
    author: 'Fernanda Souza',
    readTime: '6 min',
    date: '3 Jan 2025',
  },
  {
    slug: '5g-iot',
    title: '5G e IoT: A Combinação que Muda Tudo',
    excerpt: 'Explore como a rede 5G está acelerando a adoção de IoT e criando novas possibilidades.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '10 min',
    date: '2 Jan 2025',
  },
  {
    slug: 'financas-corporativas',
    title: 'Finanças Corporativas: Planejamento para Crescimento',
    excerpt: 'Estratégias financeiras essenciais para escalar seu negócio de forma sustentável.',
    image: businessImage,
    category: 'Negócios',
    author: 'Carlos Mendes',
    readTime: '8 min',
    date: '1 Jan 2025',
  },
  {
    slug: 'edge-computing',
    title: 'Edge Computing: Processamento na Borda da Rede',
    excerpt: 'Entenda como edge computing está reduzindo latência e melhorando aplicações em tempo real.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Pedro Costa',
    readTime: '9 min',
    date: '31 Dez 2024',
  },
  {
    slug: 'cultura-organizacional',
    title: 'Cultura Organizacional: O DNA das Empresas de Sucesso',
    excerpt: 'Como construir e manter uma cultura forte que impulsiona resultados e atrai talentos.',
    image: businessImage,
    category: 'Negócios',
    author: 'Julia Martins',
    readTime: '7 min',
    date: '30 Dez 2024',
  },
  {
    slug: 'machine-learning-producao',
    title: 'Machine Learning em Produção: Desafios e Soluções',
    excerpt: 'Os principais obstáculos ao colocar modelos de ML em produção e como superá-los.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '11 min',
    date: '29 Dez 2024',
  },
  {
    slug: 'comercio-eletronico-brasil',
    title: 'E-commerce no Brasil: Oportunidades e Crescimento',
    excerpt: 'Análise do mercado brasileiro de e-commerce e as melhores estratégias para 2025.',
    image: businessImage,
    category: 'Negócios',
    author: 'Carlos Mendes',
    readTime: '8 min',
    date: '28 Dez 2024',
  },
  {
    slug: 'devops-cultura',
    title: 'DevOps: Muito Além das Ferramentas',
    excerpt: 'Por que DevOps é principalmente sobre cultura e colaboração, não apenas automação.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Roberto Lima',
    readTime: '9 min',
    date: '27 Dez 2024',
  },
  {
    slug: 'gestao-mudancas',
    title: 'Gestão de Mudanças: Liderando Transformações',
    excerpt: 'Estratégias comprovadas para conduzir mudanças organizacionais com sucesso.',
    image: businessImage,
    category: 'Negócios',
    author: 'Fernanda Souza',
    readTime: '6 min',
    date: '26 Dez 2024',
  },
  {
    slug: 'web3-descentralizacao',
    title: 'Web3: A Internet Descentralizada do Futuro',
    excerpt: 'Como a Web3 está redesenhando a internet e criando novas oportunidades de negócio.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Pedro Costa',
    readTime: '10 min',
    date: '25 Dez 2024',
  },
  {
    slug: 'modelo-negocios-saas',
    title: 'Modelo SaaS: Estratégias de Crescimento e Retenção',
    excerpt: 'Como construir e escalar negócios SaaS de forma sustentável e lucrativa.',
    image: businessImage,
    category: 'Negócios',
    author: 'Julia Martins',
    readTime: '9 min',
    date: '24 Dez 2024',
  },
  {
    slug: 'kubernetes-orquestracao',
    title: 'Kubernetes: Orquestração de Containers em Escala',
    excerpt: 'Guia completo para implementar e gerenciar clusters Kubernetes em produção.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '12 min',
    date: '23 Dez 2024',
  },
  {
    slug: 'analytics-dados',
    title: 'Analytics: Transformando Dados em Decisões',
    excerpt: 'Como usar análise de dados para tomar decisões estratégicas mais inteligentes.',
    image: businessImage,
    category: 'Negócios',
    author: 'Carlos Mendes',
    readTime: '7 min',
    date: '22 Dez 2024',
  },
  {
    slug: 'serverless-arquitetura',
    title: 'Arquitetura Serverless: Escalabilidade sem Limites',
    excerpt: 'Benefícios e desafios de adotar arquiteturas serverless em aplicações modernas.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Roberto Lima',
    readTime: '10 min',
    date: '21 Dez 2024',
  },
  {
    slug: 'customer-success',
    title: 'Customer Success: A Chave para Retenção',
    excerpt: 'Como implementar uma estratégia de Customer Success que reduz churn e aumenta LTV.',
    image: businessImage,
    category: 'Negócios',
    author: 'Fernanda Souza',
    readTime: '8 min',
    date: '20 Dez 2024',
  },
  {
    slug: 'ia-generativa',
    title: 'IA Generativa: Criando Conteúdo com Máquinas',
    excerpt: 'Como a IA generativa está transformando criação de conteúdo, arte e código.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Pedro Costa',
    readTime: '11 min',
    date: '19 Dez 2024',
  },
  {
    slug: 'growth-hacking',
    title: 'Growth Hacking: Crescimento Exponencial com Baixo Custo',
    excerpt: 'Táticas e estratégias de growth hacking que impulsionaram startups de sucesso.',
    image: businessImage,
    category: 'Negócios',
    author: 'Julia Martins',
    readTime: '9 min',
    date: '18 Dez 2024',
  },
  {
    slug: 'microservicos-arquitetura',
    title: 'Microserviços: Arquitetura para Agilidade',
    excerpt: 'Quando e como migrar de monólito para microserviços sem quebrar tudo.',
    image: techImage,
    category: 'Tecnologia',
    author: 'Ana Silva',
    readTime: '13 min',
    date: '17 Dez 2024',
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

            {/* Articles List com Ads entre os itens */}
            <ContentWithViewportAds
              adSlot="category-viewport-ads"
              adFormat="horizontal"
              itemsPerViewport={6}
            >
              {articles.map((article, index) => (
                <article 
                  key={article.slug}
                  className="group grid md:grid-cols-[280px_1fr] gap-6 pb-6 border-b border-border"
                  style={{ 
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Thumbnail */}
                  <a 
                    href={`/artigo/${article.slug}`}
                    className="relative overflow-hidden rounded-md aspect-video bg-muted"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                      loading="lazy"
                    />
                  </a>

                  {/* Content */}
                  <div className="flex flex-col justify-center min-h-[166px]">
                    {/* Meta Info - Mobile */}
                    <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase tracking-wide mb-2 md:hidden">
                      <span>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-2">
                      <a 
                        href={`/artigo/${article.slug}`}
                        className="font-bold text-base md:text-lg text-foreground group-hover:underline line-clamp-2"
                      >
                        {article.title}
                      </a>
                    </h3>

                    {/* Excerpt - Desktop */}
                    <p className="hidden md:block text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta Info - Desktop */}
                    <div className="hidden md:flex items-center gap-4 text-xs text-primary font-bold uppercase tracking-wide">
                      <a 
                        href={`/categoria/${article.category.toLowerCase()}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        <span className="w-3 h-3 inline-block">
                          <svg viewBox="0 0 12 12" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 0.5C8 0.223858 7.77614 0 7.5 0H4.5C4.22386 0 4 0.223858 4 0.5V3.5C4 3.77614 3.77614 4 3.5 4L0.5 4C0.223858 4 0 4.22386 0 4.5V7.5C0 7.77614 0.223858 8 0.5 8H3.5C3.77614 8 4 8.22386 4 8.5V11.5C4 11.7761 4.22386 12 4.5 12H7.5C7.77614 12 8 11.7761 8 11.5V8.5C8 8.22386 8.22386 8 8.5 8H11.5C11.7761 8 12 7.77614 12 7.5V4.5C12 4.22386 11.7761 4 11.5 4L8.5 4C8.22386 4 8 3.77614 8 3.5V0.5Z"/>
                          </svg>
                        </span>
                        {article.category}
                      </a>
                      
                      <a 
                        href={`/autor/${article.author.toLowerCase().replace(' ', '-')}`}
                        className="hover:underline flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        {article.author}
                      </a>
                      
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 20h9"/>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                        </svg>
                        {article.readTime}
                      </span>
                    </div>

                    {/* Meta Info Mobile - Bottom */}
                    <div className="flex md:hidden items-center gap-4 text-xs text-primary font-bold uppercase tracking-wide mt-2">
                      <a href={`/categoria/${article.category.toLowerCase()}`} className="hover:underline">
                        {article.category}
                      </a>
                      <a href={`/autor/${article.author.toLowerCase().replace(' ', '-')}`} className="hover:underline">
                        {article.author}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </ContentWithViewportAds>

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

          {/* Sidebar - Popular Articles & Ad */}
          <aside className="hidden lg:block space-y-6">
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

            {/* Ad Space - 300x600 - Sticky */}
            <div className="sticky top-6">
              <RevealOnScroll>
                <DynamicAd 
                  slot="category-sidebar" 
                  format="vertical" 
                  position={3}
                  className="h-[600px]"
                />
              </RevealOnScroll>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
