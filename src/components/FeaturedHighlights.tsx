import { Link } from 'react-router-dom';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const highlights = [
  {
    id: 1,
    title: 'Revolução da IA Generativa: Como a Inteligência Artificial está Transformando a Criação de Conteúdo',
    image: techImage,
    slug: 'revolucao-ia-generativa',
    category: 'Tecnologia'
  },
  {
    id: 2,
    title: 'Startups Brasileiras Captam Investimentos Recordes no Primeiro Trimestre de 2025',
    image: businessImage,
    slug: 'startups-investimentos-recorde',
    category: 'Negócios'
  },
  {
    id: 3,
    title: 'Computação Quântica: A Nova Fronteira que Promete Revolucionar a Tecnologia',
    image: techImage,
    slug: 'computacao-quantica-fronteira',
    category: 'Inovação'
  },
  {
    id: 4,
    title: 'Sustentabilidade Digital: Como Empresas de Tech Estão Reduzindo sua Pegada de Carbono',
    image: businessImage,
    slug: 'sustentabilidade-digital-tech',
    category: 'Tecnologia'
  },
];

export default function FeaturedHighlights() {
  return (
    <section className="wide-container py-8">
      <h2 className="text-3xl font-bold mb-6">Mais destaques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((article) => (
          <article key={article.id} className="group">
            <Link to={`/artigo/${article.slug}`}>
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-md mb-3 aspect-video bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
                  {article.category}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-sm md:text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                {article.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
