import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { memo } from 'react';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
}

const ArticleCard = memo(({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  readTime,
  date,
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift-enhanced card-shine group cursor-pointer border-muted/50 transition-all duration-300 hover:border-muted hover:shadow-xl bg-card/50 backdrop-blur-sm">
      <Link to={`/artigo/${slug}`}>
        <div className="aspect-video overflow-hidden relative bg-muted/30">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Floating Badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-foreground/80 backdrop-blur-md text-background border-0 shadow-lg group-hover:scale-105 transition-transform duration-300">
              {category}
            </Badge>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <Badge variant="secondary" className="backdrop-blur-md bg-background/90 border-0 shadow-lg">
              {date}
            </Badge>
          </div>
        </div>
      </Link>
      <CardHeader className="space-y-3">
        <Link to={`/artigo/${slug}`}>
          <h3 className="text-xl font-bold leading-tight group-hover:text-foreground/90 transition-colors duration-300 line-clamp-2 hover:line-clamp-none">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 group-hover:text-foreground/70 transition-colors duration-300 leading-relaxed">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
        <div className="flex items-center space-x-2 group-hover:text-foreground/80 transition-all duration-300 transform group-hover:translate-x-1">
          <User className="h-4 w-4" />
          <span className="font-medium">{author}</span>
        </div>
        <div className="flex items-center space-x-2 group-hover:text-foreground/60 transition-all duration-300 transform group-hover:-translate-x-1">
          <Clock className="h-4 w-4" />
          <span className="font-medium">{readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
