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
    <Card className="overflow-hidden hover-lift group">
      <Link to={`/artigo/${slug}`}>
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader>
        <Badge className="w-fit mb-2" variant="secondary">
          {category}
        </Badge>
        <Link to={`/artigo/${slug}`}>
          <h3 className="text-xl font-bold leading-tight hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
