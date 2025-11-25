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
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 stagger-fade-in w-full max-w-full overflow-hidden">
        {heroArticles.map((article, index) => (
          <article key={article.id} className="group relative w-full max-w-full" style={{ animationDelay: `${index * 0.1}s` }}>
            <Link
              to={`/artigo/${article.slug}`}
              className="block relative aspect-[3/4] overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl md:shadow-lg md:hover:shadow-2xl transition-all duration-500 card-shine"
            >
              {/* Background Image */}
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500" />

              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-5 lg:p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                {/* Category Badge */}
                <span className="inline-block w-fit bg-foreground/90 backdrop-blur-md text-background text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full mb-2 md:mb-3 uppercase tracking-wide shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  {article.category}
                </span>
                
                {/* Title */}
                <h3 className="text-white font-bold text-xs md:text-base lg:text-lg leading-tight md:leading-snug transition-all duration-300 line-clamp-3 md:line-clamp-3 drop-shadow-lg">
                  {article.title}
                </h3>

                {/* Hover Indicator - Desktop only */}
                <div className="hidden md:flex mt-3 items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-white/90 text-sm font-medium">Ler mais</span>
                  <svg className="w-4 h-4 text-white/90 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
