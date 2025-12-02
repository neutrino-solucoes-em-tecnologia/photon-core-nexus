import { Link } from 'react-router-dom';
import { useArticles } from '@/hooks/use-articles';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroSection() {
  const { data, isLoading } = useArticles(1, 4);
  const articles = data?.data || [];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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

  const HeroCard = ({ article, index }: { article: any; index: number }) => (
    <article className="group relative overflow-hidden rounded-lg shadow-lg">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
          
          {/* Category Badge */}
          {article.category && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-xl backdrop-blur-sm">
                {article.category.name}
              </span>
            </div>
          )}
          
          {/* Title Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl leading-tight line-clamp-3 drop-shadow-2xl group-hover:text-primary-foreground transition-colors duration-300">
              {article.title}
            </h3>
          </div>

          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </article>
  );

  return (
    <section className="py-6 max-w-[1200px] mx-auto px-4">
      {/* Mobile Carousel */}
      <div className="sm:hidden">
        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {articles.map((article, index) => (
              <CarouselItem key={article.id} className="pl-2 md:pl-4">
                <div className="px-1">
                  <HeroCard article={article} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Custom Navigation Buttons */}
          <CarouselPrevious className="left-2 h-10 w-10 bg-background/90 backdrop-blur-sm border-2 hover:bg-background shadow-xl" />
          <CarouselNext className="right-2 h-10 w-10 bg-background/90 backdrop-blur-sm border-2 hover:bg-background shadow-xl" />
        </Carousel>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid (2 columns on tablet, 4 on desktop) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => (
          <HeroCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}
