import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/use-articles';

export default function HeroSection() {
  const { data, isLoading } = useArticles(1, 4);
  const articles = data?.data || [];

  if (isLoading) {
    return (
      <section className="py-6 max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-md mb-3" />
              <div className="h-5 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 max-w-[1200px] mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {articles.map((article, index) => (
          <article 
            key={article.id} 
            className="group relative overflow-hidden rounded-md"
          >
            <Link to={`/artigo/${article.slug}`}>
              {/* Background Image with Overlay */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={article.image_url}
                  alt={article.image_alt || article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&auto=format&fit=crop';
                  }}
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                
                {/* Category Badge */}
                {article.category && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-block bg-primary text-primary-foreground px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide shadow-lg">
                      {article.category.name}
                    </span>
                  </div>
                )}
                
                {/* Title Overlay at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="text-white font-black text-lg md:text-xl lg:text-2xl leading-tight line-clamp-3 group-hover:text-primary-foreground transition-colors duration-300">
                    {article.title}
                  </h3>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
