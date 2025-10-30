import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

export default function ArticleCard({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  readTime,
  date,
}: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover-lift hover-glow group cursor-pointer border-muted/50">
      <Link to={`/artigo/${slug}`}>
        <div className="aspect-video overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <CardHeader>
        <Badge className="w-fit mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="secondary">
          {category}
        </Badge>
        <Link to={`/artigo/${slug}`}>
          <h3 className="text-xl font-bold leading-tight text-gradient group-hover:opacity-100 transition-all line-clamp-2">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 group-hover:text-foreground transition-colors">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2 group-hover:text-primary transition-colors">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center space-x-2 group-hover:text-secondary transition-colors">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
