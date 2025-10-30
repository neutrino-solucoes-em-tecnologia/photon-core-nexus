import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
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
import ArticleCard from '@/components/ArticleCard';
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
    <div className="wide-container py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4">{category.title}</h1>
        <p className="text-xl text-muted-foreground">{category.description}</p>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <p className="text-muted-foreground">
          Exibindo {articles.length} artigos
        </p>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Refine sua busca por conteúdo
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Subcategorias</h4>
                <div className="space-y-2">
                  {['IA & Machine Learning', 'Cloud Computing', 'DevOps', 'Segurança'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={item} />
                      <label htmlFor={item} className="text-sm cursor-pointer">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Tempo de Leitura</h4>
                <div className="space-y-2">
                  {['Menos de 5 min', '5-10 min', 'Mais de 10 min'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={item} />
                      <label htmlFor={item} className="text-sm cursor-pointer">
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

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
