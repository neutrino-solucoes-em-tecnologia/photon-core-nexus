import { Link } from 'react-router-dom';
import heroTech from '@/assets/hero-tech-1.jpg';
import heroBusiness from '@/assets/hero-business-1.jpg';
import heroInnovation from '@/assets/hero-innovation-1.jpg';
import heroAI from '@/assets/hero-ai-1.jpg';

const heroArticles = [
  {
    id: 1,
    title: 'Revolução da IA: Como Assistentes Inteligentes Estão Transformando o Trabalho',
    category: 'Tecnologia',
    image: heroTech,
    slug: 'revolucao-ia-assistentes-inteligentes'
  },
  {
    id: 2,
    title: 'Liderança Global: Estratégias de Expansão para Mercados Emergentes',
    category: 'Negócios',
    image: heroBusiness,
    slug: 'lideranca-global-estrategias'
  },
  {
    id: 3,
    title: 'Startups Inovadoras: O Futuro do Trabalho Criativo e Tecnologia',
    category: 'Inovação',
    image: heroInnovation,
    slug: 'startups-inovadoras-futuro'
  },
  {
    id: 4,
    title: 'Era dos Robôs: A Nova Geração de Inteligência Artificial Autônoma',
    category: 'Tecnologia',
    image: heroAI,
    slug: 'era-robos-ia-autonoma'
  },
];

export default function HeroSection() {
  return (
    <section className="wide-container py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {heroArticles.map((article) => (
          <article key={article.id} className="group relative">
            <Link
              to={`/artigo/${article.slug}`}
              className="block relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg"
            >
              {/* Background Image */}
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                {/* Category Badge */}
                <span className="inline-block w-fit bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded mb-3 uppercase tracking-wide">
                  {article.category}
                </span>
                
                {/* Title */}
                <h3 className="text-white font-bold text-base md:text-lg leading-snug transition-colors group-hover:text-secondary line-clamp-3">
                  {article.title}
                </h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
