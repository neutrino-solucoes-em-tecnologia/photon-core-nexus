# TypeScript Types - Photon Media

## 📋 Visão Geral

Este documento contém todas as interfaces e tipos TypeScript utilizados no projeto Photon Media para integração com a API Laravel.

---

## 🗂️ Estrutura de Tipos

```
src/types/
├── api.types.ts       # Tipos gerais da API
├── article.types.ts   # Artigos e categorias
├── comment.types.ts   # Comentários
└── index.ts           # Exportações centralizadas
```

---

## 📦 API Types (api.types.ts)

### Tipos Gerais

```typescript
// Resposta paginada genérica
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

// Resposta de sucesso genérica
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Erro da API
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

// Parâmetros de paginação
export interface PaginationParams {
  page?: number;
  per_page?: number;
}

// Parâmetros de ordenação
export interface SortParams {
  sort?: 'latest' | 'oldest' | 'popular' | 'trending';
  order?: 'asc' | 'desc';
}

// Parâmetros de busca
export interface SearchParams {
  search?: string;
  q?: string;
}

// Meta informações de recursos
export interface ResourceMeta {
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
```

---

## 📰 Article Types (article.types.ts)

### Categoria

```typescript
export interface Category {
  id: number;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: number;
  parent?: Category;
  children?: Category[];
  articles_count?: number;
  created_at: string;
  updated_at: string;
}

// Parâmetros para listar categorias
export interface CategoriesParams {
  include_children?: boolean;
  with_counts?: boolean;
}
```

### Autor

```typescript
export interface Author {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  articles_count?: number;
  created_at: string;
  updated_at: string;
}
```

### Tag

```typescript
export interface Tag {
  id: number;
  slug: string;
  name: string;
  description?: string;
  articles_count?: number;
  created_at: string;
  updated_at: string;
}
```

### Artigo

```typescript
export interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  featured_image_caption?: string;
  category: Category;
  author: Author;
  tags?: Tag[];
  read_time: string;
  views: number;
  comments_count: number;
  likes_count: number;
  shares_count: number;
  is_featured: boolean;
  is_highlight: boolean;
  is_breaking: boolean;
  is_sponsored: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  
  // SEO
  meta?: ArticleMeta;
}

// Metadata de artigo
export interface ArticleMeta {
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_card?: 'summary' | 'summary_large_image';
  canonical_url?: string;
}

// Artigo simplificado (listagem)
export interface ArticleListItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  category: {
    id: number;
    slug: string;
    name: string;
    color?: string;
  };
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  read_time: string;
  views: number;
  comments_count: number;
  is_featured: boolean;
  published_at: string;
}

// Parâmetros para listar artigos
export interface ArticlesParams extends PaginationParams, SortParams, SearchParams {
  category?: string;
  author?: number;
  tag?: string;
  featured?: boolean;
  highlight?: boolean;
  breaking?: boolean;
  exclude?: number[];
  include?: ('category' | 'author' | 'tags' | 'meta')[];
}

// Parâmetros para artigos relacionados
export interface RelatedArticlesParams {
  limit?: number;
  exclude?: number[];
  same_category?: boolean;
  same_tags?: boolean;
}
```

---

## 💬 Comment Types (comment.types.ts)

### Comentário

```typescript
export interface Comment {
  id: number;
  article_id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  parent_id?: number;
  content: string;
  likes_count: number;
  replies_count: number;
  is_edited: boolean;
  is_pinned: boolean;
  is_author_reply: boolean;
  created_at: string;
  updated_at: string;
  
  // Respostas aninhadas
  replies?: Comment[];
}

// Parâmetros para listar comentários
export interface CommentsParams extends PaginationParams {
  sort?: 'latest' | 'oldest' | 'popular';
  parent_id?: number | null;
}

// Criar comentário
export interface CreateCommentRequest {
  name: string;
  email: string;
  content: string;
  parent_id?: number;
}

export interface CreateCommentResponse {
  comment: Comment;
}

// Deletar comentário
export interface DeleteCommentResponse {
  success: boolean;
  message: string;
}
```

---

## 🔍 Search Types

```typescript
export interface SearchResult {
  articles: ArticleListItem[];
  categories: Category[];
  tags: Tag[];
  total: number;
}

export interface SearchParams {
  q: string;
  type?: 'all' | 'articles' | 'categories' | 'tags';
  limit?: number;
}

export interface SearchSuggestion {
  type: 'article' | 'category' | 'tag';
  id: number;
  title: string;
  slug: string;
  image?: string;
}
```

---

## 📊 Stats Types

```typescript
export interface ArticleStats {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  avg_reading_time: number;
  completion_rate: number;
}

export interface TrendingArticle {
  article: ArticleListItem;
  score: number;
  views_24h: number;
  trend: 'up' | 'down' | 'stable';
}

export interface CategoryStats {
  category: Category;
  articles_count: number;
  views_total: number;
  views_30d: number;
}

export interface PlatformStats {
  total_articles: number;
  total_categories: number;
  total_comments: number;
  trending_articles: TrendingArticle[];
  popular_categories: CategoryStats[];
}
```

---

## 📬 Contact Types

```typescript
export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ContactResponse {
  message: string;
}
```

---

## 📧 Newsletter Types

```typescript
export interface NewsletterSubscribeRequest {
  email: string;
  name?: string;
}

export interface NewsletterUnsubscribeRequest {
  email: string;
  token: string;
}

export interface NewsletterResponse {
  message: string;
}
```

---

## 🛠️ Utility Types

```typescript
// Omitir campos de timestamp
export type WithoutTimestamps<T> = Omit<T, 'created_at' | 'updated_at' | 'deleted_at'>;

// Apenas campos de ID
export type IdOnly<T> = Pick<T, 'id'>;

// Tipo parcial profundo
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Tipo para formulários
export type FormValues<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

// Tipo para respostas de API
export type ApiResponseData<T> = {
  data: T;
  meta?: any;
  links?: any;
};

// Status de carregamento
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}
```

---

## 🎯 Type Guards

```typescript
// Verificar se é paginado
export function isPaginatedResponse<T>(
  response: any
): response is PaginatedResponse<T> {
  return (
    response &&
    typeof response === 'object' &&
    'data' in response &&
    'meta' in response &&
    Array.isArray(response.data)
  );
}

// Verificar se é erro da API
export function isApiError(error: any): error is ApiError {
  return error && typeof error === 'object' && 'message' in error;
}

// Verificar se artigo tem conteúdo completo
export function isFullArticle(article: Article | ArticleListItem): article is Article {
  return 'content' in article && article.content !== undefined;
}
```

---

## 📤 Export Central (index.ts)

```typescript
// API Types
export * from './api.types';

// Article Types
export * from './article.types';

// Comment Types
export * from './comment.types';

// Utility Functions
export * from './guards';
export * from './utils';
```

---

## 💡 Exemplos de Uso

### Componente com Tipagem

```typescript
import { Article, PaginatedResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface ArticleListProps {
  categorySlug?: string;
}

export default function ArticleList({ categorySlug }: ArticleListProps) {
  const { data, isLoading } = useQuery<PaginatedResponse<Article>>({
    queryKey: ['articles', categorySlug],
    queryFn: () => fetchArticles({ category: categorySlug }),
  });

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {data?.data.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
```

### Serviço com Tipagem

```typescript
import api from './api';
import { Article, ArticlesParams, PaginatedResponse } from '@/types';

export const articleService = {
  getArticles: async (
    params: ArticlesParams
  ): Promise<PaginatedResponse<Article>> => {
    const response = await api.get<PaginatedResponse<Article>>('/articles', { params });
    return response.data;
  },

  getArticleBySlug: async (slug: string): Promise<Article> => {
    const response = await api.get<Article>(`/articles/${slug}`);
    return response.data;
  },
};
```

### Hook com Tipagem

```typescript
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Article } from '@/types';
import { articleService } from '@/services/article.service';

export function useArticle(slug: string): UseQueryResult<Article, Error> {
  return useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug,
  });
}
```

---

## 🔗 Recursos Relacionados

- [API Integration Documentation](./API_INTEGRATION.md)
- [Migration Guide](./MIGRATION_GUIDE.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Última atualização:** 24/11/2025
