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
    <section className="w-full px-4 py-6 md:px-6 md:py-8 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[1600px] mx-auto">
        {heroArticles.map((article) => (
          <Link
            key={article.id}
            to={`/artigo/${article.slug}`}
            className="group relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-secondary text-secondary-foreground rounded">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl leading-tight transition-colors group-hover:text-secondary">
                {article.title}
              </h3>

              {/* Hover Indicator */}
              <div className="mt-4 flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Ler artigo</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {/* Subtle Border Effect on Hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 transition-colors pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
