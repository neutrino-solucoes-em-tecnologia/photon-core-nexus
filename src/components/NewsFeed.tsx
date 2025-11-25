import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useEffect } from 'react';
import techImage from '@/assets/article-tech.jpg';
import businessImage from '@/assets/article-business.jpg';

const newsArticles = [
  {
    id: 1,
    title: 'OpenAI Lança GPT-5: Nova Era da Inteligência Artificial',
    excerpt: 'A mais recente versão do modelo de linguagem promete revolucionar ainda mais o mercado de IA com capacidades inéditas de raciocínio.',
    image: techImage,
    slug: 'openai-gpt5-lancamento',
    category: 'Tecnologia',
    readTime: '5 min',
    comments: 42
  },
  {
    id: 2,
    title: 'Mercado de Ações: Investidores Apostam em Tech Stocks',
    excerpt: 'Empresas de tecnologia lideram alta na bolsa, impulsionadas por resultados acima do esperado.',
    image: businessImage,
    slug: 'mercado-acoes-tech-stocks',
    category: 'Negócios',
    readTime: '4 min',
    comments: 28
  },
  {
    id: 3,
    title: 'Blockchain: Além das Criptomoedas',
    excerpt: 'Descubra como a tecnologia blockchain está sendo aplicada em setores tradicionais da economia.',
    image: techImage,
    slug: 'blockchain-aplicacoes-praticas',
    category: 'Inovação',
    readTime: '7 min',
    comments: 35
  },
  {
    id: 4,
    title: 'Startups Verdes Atraem Bilhões em Investimentos',
    excerpt: 'Empresas focadas em sustentabilidade recebem aportes recordes de fundos de venture capital.',
    image: businessImage,
    slug: 'startups-verdes-investimentos',
    category: 'Negócios',
    readTime: '6 min',
    comments: 19
  },
  {
    id: 5,
    title: 'Computação Quântica: IBM Anuncia Novo Processador',
    excerpt: 'Novo chip quântico promete acelerar o desenvolvimento de soluções para problemas complexos.',
    image: techImage,
    slug: 'ibm-processador-quantico',
    category: 'Tecnologia',
    readTime: '8 min',
    comments: 51
  },
  {
    id: 6,
    title: 'E-commerce: Tendências para 2025',
    excerpt: 'Análise das principais tendências que vão moldar o comércio eletrônico nos próximos meses.',
    image: businessImage,
    slug: 'ecommerce-tendencias-2025',
    category: 'Negócios',
    readTime: '5 min',
    comments: 23
  }
];

export default function NewsFeed() {
  useEffect(() => {
    try {
      setTimeout(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }, 100);
    } catch (err) {
      if (import.meta.env.VITE_SHOW_ADSENSE_ERRORS === 'true') {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <section className="py-4 md:py-6 px-4 sm:px-6">
      <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Últimas Notícias</h2>
      
      <div className="w-full max-w-full overflow-hidden">
        {newsArticles.map((article, index) => (
          <div key={article.id}>
              <article 
                className="group grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-3 md:gap-4 lg:gap-6 pb-4 md:pb-6 border-b border-border w-full max-w-full"
              >
              {/* Thumbnail */}
              <Link 
                to={`/artigo/${article.slug}`} 
                className="relative overflow-hidden rounded-md aspect-video md:aspect-video bg-muted flex-shrink-0 w-full"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-85"
                  loading="lazy"
                />
              </Link>

              {/* Content */}
              <div className="flex flex-col justify-start md:justify-center min-h-0">
                {/* Title */}
                <h3 className="mb-1.5 md:mb-2">
                  <Link 
                    to={`/artigo/${article.slug}`}
                    className="font-bold text-sm md:text-base lg:text-lg text-foreground group-hover:underline line-clamp-2 md:line-clamp-2"
                  >
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt - Desktop */}
                <p className="hidden md:block text-sm text-muted-foreground mb-2 md:mb-3 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta Info - Desktop */}
                <div className="hidden md:flex items-center gap-4 text-xs text-primary font-bold uppercase tracking-wide">
                  <Link 
                    to={`/categoria/${article.category.toLowerCase()}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span className="w-3 h-3 inline-block">
                      <svg viewBox="0 0 12 12" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0.5C8 0.223858 7.77614 0 7.5 0H4.5C4.22386 0 4 0.223858 4 0.5V3.5C4 3.77614 3.77614 4 3.5 4L0.5 4C0.223858 4 0 4.22386 0 4.5V7.5C0 7.77614 0.223858 8 0.5 8H3.5C3.77614 8 4 8.22386 4 8.5V11.5C4 11.7761 4.22386 12 4.5 12H7.5C7.77614 12 8 11.7761 8 11.5V8.5C8 8.22386 8.22386 8 8.5 8H11.5C11.7761 8 12 7.77614 12 7.5V4.5C12 4.22386 11.7761 4 11.5 4L8.5 4C8.22386 4 8 3.77614 8 3.5V0.5Z"/>
                      </svg>
                    </span>
                    {article.category}
                  </Link>
                  
                  <span className="flex items-center gap-1">
                    {article.readTime}
                  </span>
                  
                  <Link 
                    to={`/artigo/${article.slug}#comments`}
                    className="hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3 h-3" />
                    {article.comments}
                  </Link>
                </div>

                {/* Meta Info Mobile - Bottom */}
                <div className="flex md:hidden items-center gap-2 md:gap-3 text-[10px] md:text-xs text-primary font-bold uppercase tracking-wide mt-1">
                  <span className="text-muted-foreground">{article.readTime}</span>
                  <Link to={`/categoria/${article.category.toLowerCase()}`} className="hover:underline truncate">
                    {article.category}
                  </Link>
                  <Link to={`/artigo/${article.slug}#comments`} className="hover:underline flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {article.comments}
                  </Link>
                </div>
              </div>
            </article>

            {/* HOME-DISPLAY-03 - Ad after first item and before second-to-last item */}
            {(index === 0 || index === newsArticles.length - 2) && (
              <div className="py-4 md:py-6 border-b border-border">
                <div className="not-prose">
                  <ins 
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                    data-ad-slot={import.meta.env.VITE_ADSENSE_SLOT_HOME_DISPLAY_03}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  />
                </div>
              </div>
            )}
          </div>
          ))}
      </div>
    </section>
  );
}
