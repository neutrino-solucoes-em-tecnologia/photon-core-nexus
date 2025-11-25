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
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Mais Destaques</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
        {highlights.map((article) => (
          <article key={article.id} className="group w-full max-w-full">
            <Link to={`/artigo/${article.slug}`}>
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-md mb-2 md:mb-3 aspect-video bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <span className="absolute top-1.5 left-1.5 md:top-2 md:left-2 bg-primary text-primary-foreground text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded uppercase tracking-wide">
                  {article.category}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-xs md:text-sm lg:text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-3">
                {article.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
