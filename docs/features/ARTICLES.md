# Feature: Artigos

## 📋 Visão Geral

Sistema de listagem, visualização e interação com artigos do Photon Media.

---

## 🎯 Objetivos

- Listar artigos com paginação e filtros
- Exibir detalhes completos de artigos
- Artigos em destaque (Hero)
- Artigos relacionados
- Integração com categorias e tags
- Tracking de visualizações e progresso de leitura

---

## 📊 Endpoints da API

### 1. Listar Artigos

**GET** `/api/v1/articles`

**Query Parameters:**
```typescript
{
  page?: number;           // Página atual (default: 1)
  per_page?: number;       // Items por página (default: 12)
  category?: string;       // Slug da categoria
  author?: number;         // ID do autor
  tag?: string;            // Slug da tag
  search?: string;         // Busca por título/conteúdo
  sort?: 'latest' | 'oldest' | 'popular' | 'trending';
  featured?: boolean;      // Apenas artigos em destaque
  exclude?: number[];      // IDs para excluir
}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "futuro-ia-empresas",
      "title": "O Futuro da IA nas Empresas",
      "excerpt": "Descubra como a inteligência artificial...",
      "featured_image": "https://...",
      "category": {
        "id": 1,
        "slug": "tecnologia",
        "name": "Tecnologia",
        "color": "#3B82F6"
      },
      "author": {
        "id": 1,
        "name": "João Silva",
        "avatar": "https://..."
      },
      "read_time": "5 min",
      "views": 1523,
      "comments_count": 12,
      "is_featured": true,
      "published_at": "2024-11-20T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 156,
    "last_page": 13
  },
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  }
}
```

---

### 2. Obter Artigo por Slug

**GET** `/api/v1/articles/{slug}`

**Response:**
```json
{
  "id": 1,
  "slug": "futuro-ia-empresas",
  "title": "O Futuro da IA nas Empresas",
  "subtitle": "Como a tecnologia está transformando...",
  "excerpt": "Descubra como...",
  "content": "<h2>Introdução</h2><p>...</p>",
  "featured_image": "https://...",
  "featured_image_caption": "Imagem ilustrativa",
  "category": { /* ... */ },
  "author": { /* ... */ },
  "tags": [
    {
      "id": 1,
      "slug": "inteligencia-artificial",
      "name": "Inteligência Artificial"
    }
  ],
  "read_time": "5 min",
  "views": 1523,
  "comments_count": 12,
  "likes_count": 89,
  "shares_count": 34,
  "is_featured": true,
  "published_at": "2024-11-20T10:00:00Z",
  "meta": {
    "seo_title": "O Futuro da IA nas Empresas | Photon Media",
    "seo_description": "Descubra como...",
    "seo_keywords": ["IA", "Empresas", "Tecnologia"]
  }
}
```

---

### 3. Artigos em Destaque (Hero)

**GET** `/api/v1/articles/featured`

**Query Parameters:**
```typescript
{
  limit?: number;  // Número de artigos (default: 4)
}
```

---

### 4. Destaques Secundários

**GET** `/api/v1/articles/highlights`

**Query Parameters:**
```typescript
{
  limit?: number;  // Número de artigos (default: 4)
}
```

---

### 5. Últimas Notícias

**GET** `/api/v1/articles/latest`

**Query Parameters:**
```typescript
{
  limit?: number;     // Número de artigos (default: 6)
  exclude?: number[]; // IDs para excluir
}
```

---

### 6. Artigos Relacionados

**GET** `/api/v1/articles/{slug}/related`

**Query Parameters:**
```typescript
{
  limit?: number;  // Número de artigos (default: 3)
}
```

---

## 💻 Implementação Frontend

### 1. Types

**Arquivo:** `src/types/article.types.ts`

```typescript
export interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  category: Category;
  author: Author;
  tags?: Tag[];
  read_time: string;
  views: number;
  comments_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ArticlesParams {
  page?: number;
  per_page?: number;
  category?: string;
  author?: number;
  tag?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'popular' | 'trending';
  featured?: boolean;
  exclude?: number[];
}
```

---

### 2. Service

**Arquivo:** `src/services/article.service.ts`

```typescript
import api from './api';
import { Article, PaginatedResponse, ArticlesParams } from '@/types';

export const articleService = {
  // Listar artigos
  getArticles: async (params: ArticlesParams = {}): Promise<PaginatedResponse<Article>> => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  // Obter por slug
  getArticleBySlug: async (slug: string): Promise<Article> => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  },

  // Featured (Hero)
  getFeaturedArticles: async (limit: number = 4): Promise<Article[]> => {
    const response = await api.get('/articles/featured', { params: { limit } });
    return response.data.data;
  },

  // Highlights
  getHighlights: async (limit: number = 4): Promise<Article[]> => {
    const response = await api.get('/articles/highlights', { params: { limit } });
    return response.data.data;
  },

  // Latest
  getLatestNews: async (limit: number = 6, exclude: number[] = []): Promise<Article[]> => {
    const response = await api.get('/articles/latest', { params: { limit, exclude } });
    return response.data.data;
  },

  // Related
  getRelatedArticles: async (slug: string, limit: number = 3): Promise<Article[]> => {
    const response = await api.get(`/articles/${slug}/related`, { params: { limit } });
    return response.data.data;
  },
};
```

---

### 3. Hooks

**Arquivo:** `src/hooks/useArticles.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { Article, PaginatedResponse, ArticlesParams } from '@/types';
import { articleService } from '@/services/article.service';

// Listar artigos
export const useArticles = (params: ArticlesParams = {}) => {
  return useQuery<PaginatedResponse<Article>>({
    queryKey: ['articles', params],
    queryFn: () => articleService.getArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Artigo por slug
export const useArticle = (slug: string) => {
  return useQuery<Article>({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};

// Featured
export const useFeaturedArticles = (limit: number = 4) => {
  return useQuery<Article[]>({
    queryKey: ['articles', 'featured', limit],
    queryFn: () => articleService.getFeaturedArticles(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Highlights
export const useHighlights = (limit: number = 4) => {
  return useQuery<Article[]>({
    queryKey: ['articles', 'highlights', limit],
    queryFn: () => articleService.getHighlights(limit),
    staleTime: 5 * 60 * 1000,
  });
};

// Latest
export const useLatestNews = (limit: number = 6, exclude: number[] = []) => {
  return useQuery<Article[]>({
    queryKey: ['articles', 'latest', limit, exclude],
    queryFn: () => articleService.getLatestNews(limit, exclude),
    staleTime: 2 * 60 * 1000,
  });
};

// Related
export const useRelatedArticles = (slug: string, limit: number = 3) => {
  return useQuery<Article[]>({
    queryKey: ['articles', 'related', slug, limit],
    queryFn: () => articleService.getRelatedArticles(slug, limit),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
```

---

### 4. Componente Home

**Arquivo:** `src/pages/Home.tsx`

**ANTES (Mock):**
```typescript
const featuredArticles = [
  { id: 1, slug: 'test', title: 'Test', /* ... */ },
];

export default function Home() {
  return (
    <div>
      <HeroSection articles={featuredArticles} />
    </div>
  );
}
```

**DEPOIS (API):**
```typescript
import { useFeaturedArticles, useHighlights, useLatestNews } from '@/hooks/useArticles';

export default function Home() {
  const { data: featured, isLoading: loadingFeatured } = useFeaturedArticles(4);
  const { data: highlights, isLoading: loadingHighlights } = useHighlights(4);
  const { data: latest, isLoading: loadingLatest } = useLatestNews(6);

  if (loadingFeatured || loadingHighlights || loadingLatest) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="pb-8 w-full">
      <HeroSection articles={featured || []} />
      <FeaturedHighlights articles={highlights || []} />
      <NewsFeed articles={latest || []} />
    </div>
  );
}
```

---

### 5. Componente Categoria

**Arquivo:** `src/pages/Categoria.tsx`

**ANTES (Mock):**
```typescript
const articles = [/* mock data */];
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;

const currentArticles = articles.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
```

**DEPOIS (API):**
```typescript
import { useArticles } from '@/hooks/useArticles';
import { useParams } from 'react-router-dom';

export default function Categoria() {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useArticles({
    category: slug,
    page: currentPage,
    per_page: 12,
    sort: 'latest',
  });

  if (isLoading) return <CategoryPageSkeleton />;
  if (isError) return <ErrorState />;

  const { data: articles, meta } = data!;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      <Pagination
        currentPage={meta.current_page}
        totalPages={meta.last_page}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
```

---

### 6. Componente Artigo

**Arquivo:** `src/pages/Artigo.tsx`

**ANTES (Mock):**
```typescript
const article = {
  title: 'Test Article',
  content: 'Lorem ipsum...',
};

export default function Artigo() {
  return <article><h1>{article.title}</h1></article>;
}
```

**DEPOIS (API):**
```typescript
import { useArticle, useRelatedArticles } from '@/hooks/useArticles';
import { useParams } from 'react-router-dom';

export default function Artigo() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticle(slug!);
  const { data: related } = useRelatedArticles(slug!, 3);

  if (isLoading) return <ArticlePageSkeleton />;
  if (isError || !article) return <NotFound />;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        {article.subtitle && (
          <p className="text-xl text-muted-foreground">{article.subtitle}</p>
        )}
      </header>

      {/* Featured Image */}
      <img
        src={article.featured_image}
        alt={article.title}
        className="w-full h-auto rounded-lg mb-8"
      />

      {/* Content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content || '' }}
      />

      {/* Related Articles */}
      {related && related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Artigos Relacionados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <ArticleCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
```

---

### 7. Loading States

**Arquivo:** `src/components/ArticlePageSkeleton.tsx`

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticlePageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <Skeleton className="h-12 w-3/4 mb-4" />
      
      {/* Subtitle */}
      <Skeleton className="h-6 w-full mb-8" />
      
      {/* Image */}
      <Skeleton className="h-96 w-full mb-8" />
      
      {/* Content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}
```

---

## 🎨 Componentes Visuais

### ArticleCard

```typescript
interface ArticleCardProps {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  author: {
    name: string;
    avatar?: string;
  };
  read_time: string;
  views: number;
  published_at: string;
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  featured_image,
  category,
  author,
  read_time,
  views,
  published_at,
}: ArticleCardProps) {
  return (
    <Link to={`/artigo/${slug}`}>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <img
            src={featured_image}
            alt={title}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          
          <div className="p-4">
            <Badge style={{ backgroundColor: category.color }}>
              {category.name}
            </Badge>
            
            <h3 className="text-xl font-bold mt-2 mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4">{excerpt}</p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={author.avatar} />
                  <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <span>{author.name}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span>{read_time}</span>
                <span>{views} views</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```

---

## 🧪 Testes

```typescript
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useArticles, useArticle } from '@/hooks/useArticles';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useArticles', () => {
  it('should fetch articles', async () => {
    const { result } = renderHook(() => useArticles({ page: 1 }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.data).toBeInstanceOf(Array);
  });
});

describe('useArticle', () => {
  it('should fetch article by slug', async () => {
    const { result } = renderHook(() => useArticle('test-article'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.slug).toBe('test-article');
  });
});
```

---

## ✅ Checklist de Implementação

- [ ] Criar tipos TypeScript em `article.types.ts`
- [ ] Implementar `articleService` com todos os métodos
- [ ] Criar hooks customizados em `useArticles.ts`
- [ ] Migrar componente `Home.tsx` para usar API
- [ ] Migrar componente `Categoria.tsx` com paginação
- [ ] Migrar componente `Artigo.tsx` com artigos relacionados
- [ ] Criar `ArticlePageSkeleton` para loading state
- [ ] Criar `ArticleCard` component
- [ ] Implementar tratamento de erros
- [ ] Adicionar testes unitários
- [ ] Testar paginação
- [ ] Testar filtros (categoria, tag, busca)
- [ ] Testar cache do React Query
- [ ] Validar SEO meta tags

---

## 📚 Recursos

- [React Query Documentation](https://tanstack.com/query/latest)
- [API Integration Guide](../API_INTEGRATION.md)
- [TypeScript Types](../TYPES.md)

---

**Última atualização:** 24/11/2025
