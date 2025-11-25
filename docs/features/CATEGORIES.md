# Feature: Categorias

## 📋 Visão Geral

Sistema de categorização de conteúdo do Photon Media, permitindo organização hierárquica de artigos.

---

## 🎯 Objetivos

- Listar todas as categorias disponíveis
- Exibir detalhes de categoria individual
- Listar artigos por categoria
- Suporte a categorias hierárquicas (pais e filhas)
- Estatísticas de categorias (contagem de artigos, views)

---

## 📊 Endpoints da API

### 1. Listar Categorias

**GET** `/api/v1/categories`

**Query Parameters:**
```typescript
{
  include_children?: boolean;  // Incluir subcategorias
  with_counts?: boolean;       // Incluir contagem de artigos
}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "slug": "tecnologia",
      "name": "Tecnologia",
      "description": "Notícias e análises sobre tecnologia",
      "icon": "cpu",
      "color": "#3B82F6",
      "parent_id": null,
      "articles_count": 156,
      "children": [
        {
          "id": 2,
          "slug": "inteligencia-artificial",
          "name": "Inteligência Artificial",
          "parent_id": 1,
          "articles_count": 45
        }
      ],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-11-20T10:00:00Z"
    }
  ]
}
```

---

### 2. Obter Categoria por Slug

**GET** `/api/v1/categories/{slug}`

**Response:**
```json
{
  "id": 1,
  "slug": "tecnologia",
  "name": "Tecnologia",
  "description": "Notícias e análises sobre o mundo da tecnologia",
  "icon": "cpu",
  "color": "#3B82F6",
  "parent_id": null,
  "parent": null,
  "children": [
    {
      "id": 2,
      "slug": "inteligencia-artificial",
      "name": "Inteligência Artificial",
      "articles_count": 45
    }
  ],
  "articles_count": 156,
  "views_total": 45678,
  "views_30d": 12345,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-11-20T10:00:00Z"
}
```

---

### 3. Listar Artigos da Categoria

**GET** `/api/v1/categories/{slug}/articles`

**Query Parameters:**
```typescript
{
  page?: number;
  per_page?: number;
  sort?: 'latest' | 'oldest' | 'popular';
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
      "excerpt": "Descubra como...",
      "featured_image": "https://...",
      "category": {
        "id": 1,
        "slug": "tecnologia",
        "name": "Tecnologia"
      },
      "read_time": "5 min",
      "views": 1523,
      "published_at": "2024-11-20T10:00:00Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 12,
    "total": 156,
    "last_page": 13
  }
}
```

---

## 💻 Implementação Frontend

### 1. Types

**Arquivo:** `src/types/category.types.ts`

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
  views_total?: number;
  views_30d?: number;
  created_at: string;
  updated_at: string;
}

export interface CategoriesParams {
  include_children?: boolean;
  with_counts?: boolean;
}

export interface CategoryStats {
  category: Category;
  articles_count: number;
  views_total: number;
  views_30d: number;
  trending_articles?: number;
}
```

---

### 2. Service

**Arquivo:** `src/services/category.service.ts`

```typescript
import api from './api';
import { Category, CategoriesParams, PaginatedResponse, Article } from '@/types';

export const categoryService = {
  // Listar categorias
  getCategories: async (params: CategoriesParams = {}): Promise<Category[]> => {
    const response = await api.get('/categories', { params });
    return response.data.data;
  },

  // Obter categoria por slug
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  // Artigos da categoria
  getCategoryArticles: async (
    slug: string,
    params: { page?: number; per_page?: number; sort?: string } = {}
  ): Promise<PaginatedResponse<Article>> => {
    const response = await api.get(`/categories/${slug}/articles`, { params });
    return response.data;
  },
};
```

---

### 3. Hooks

**Arquivo:** `src/hooks/useCategories.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { Category, CategoriesParams, PaginatedResponse, Article } from '@/types';
import { categoryService } from '@/services/category.service';

// Listar todas as categorias
export const useCategories = (params: CategoriesParams = {}) => {
  return useQuery<Category[]>({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getCategories(params),
    staleTime: 30 * 60 * 1000, // 30 minutos (categorias mudam pouco)
  });
};

// Categoria por slug
export const useCategory = (slug: string) => {
  return useQuery<Category>({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  });
};

// Artigos da categoria
export const useCategoryArticles = (
  slug: string,
  params: { page?: number; per_page?: number; sort?: string } = {}
) => {
  return useQuery<PaginatedResponse<Article>>({
    queryKey: ['category-articles', slug, params],
    queryFn: () => categoryService.getCategoryArticles(slug, params),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
```

---

### 4. Componente Sidebar de Categorias

**Arquivo:** `src/components/AppSidebar.tsx`

**ANTES (Mock):**
```typescript
const categories = [
  { slug: 'tecnologia', name: 'Tecnologia', icon: Cpu },
  { slug: 'negocios', name: 'Negócios', icon: Briefcase },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      {categories.map((cat) => (
        <SidebarMenuItem key={cat.slug}>
          <SidebarMenuButton asChild>
            <Link to={`/categoria/${cat.slug}`}>
              <cat.icon />
              <span>{cat.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </Sidebar>
  );
}
```

**DEPOIS (API):**
```typescript
import { useCategories } from '@/hooks/useCategories';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppSidebar() {
  const { data: categories, isLoading } = useCategories({
    include_children: false,
    with_counts: true,
  });

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categorias</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories?.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/categoria/${category.slug}`}>
                      <i className={`icon-${category.icon}`} />
                      <span>{category.name}</span>
                      {category.articles_count && (
                        <Badge variant="secondary" className="ml-auto">
                          {category.articles_count}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
```

---

### 5. Componente Página de Categoria

**Arquivo:** `src/pages/Categoria.tsx`

**ANTES (Mock):**
```typescript
const category = {
  name: 'Tecnologia',
  description: 'Notícias sobre tecnologia',
  color: '#3B82F6',
};

const articles = [/* mock data */];
const [currentPage, setCurrentPage] = useState(1);
```

**DEPOIS (API):**
```typescript
import { useCategory, useCategoryArticles } from '@/hooks/useCategories';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function Categoria() {
  const { slug } = useParams<{ slug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: category, isLoading: loadingCategory } = useCategory(slug!);
  const { data: articlesData, isLoading: loadingArticles } = useCategoryArticles(slug!, {
    page: currentPage,
    per_page: 12,
    sort: 'latest',
  });

  if (loadingCategory || loadingArticles) {
    return <CategoryPageSkeleton />;
  }

  if (!category) {
    return <NotFound />;
  }

  const articles = articlesData?.data || [];
  const meta = articlesData?.meta;

  return (
    <div className="py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: category.color }}
          >
            <i className={`icon-${category.icon} text-white text-2xl`} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            {category.description && (
              <p className="text-muted-foreground">{category.description}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>{category.articles_count} artigos</span>
          {category.views_30d && <span>{category.views_30d.toLocaleString()} views (30d)</span>}
        </div>
      </div>

      {/* Subcategories (se houver) */}
      {category.children && category.children.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Subcategorias</h2>
          <div className="flex flex-wrap gap-2">
            {category.children.map((child) => (
              <Link key={child.id} to={`/categoria/${child.slug}`}>
                <Badge
                  variant="outline"
                  className="hover:bg-accent cursor-pointer"
                  style={{ borderColor: child.color }}
                >
                  {child.name}
                  {child.articles_count && ` (${child.articles_count})`}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.last_page > 1 && (
        <Pagination
          currentPage={meta.current_page}
          totalPages={meta.last_page}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
```

---

### 6. Componente de Card de Categoria

**Arquivo:** `src/components/CategoryCard.tsx`

```typescript
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CategoryCardProps {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  articles_count?: number;
  views_30d?: number;
}

export default function CategoryCard({
  slug,
  name,
  description,
  icon,
  color = '#3B82F6',
  articles_count,
  views_30d,
}: CategoryCardProps) {
  return (
    <Link to={`/categoria/${slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {icon && <i className={`icon-${icon} text-white text-3xl`} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold mb-1 truncate">{name}</h3>
              {description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {description}
                </p>
              )}

              {/* Stats */}
              <div className="flex gap-3 text-xs text-muted-foreground">
                {articles_count !== undefined && (
                  <Badge variant="secondary">{articles_count} artigos</Badge>
                )}
                {views_30d && (
                  <span>{views_30d.toLocaleString()} views</span>
                )}
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

### 7. Página de Listagem de Categorias

**Arquivo:** `src/pages/Categorias.tsx` (novo)

```typescript
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from '@/components/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Categorias() {
  const { data: categories, isLoading } = useCategories({
    include_children: true,
    with_counts: true,
  });

  if (isLoading) {
    return (
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8">Categorias</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  // Separar categorias principais das subcategorias
  const mainCategories = categories?.filter((cat) => !cat.parent_id) || [];

  return (
    <div className="py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Todas as Categorias</h1>
        <p className="text-muted-foreground">
          Explore nosso conteúdo organizado por categoria
        </p>
      </header>

      {/* Main Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainCategories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
```

---

## 🎨 Componentes de Loading

**Arquivo:** `src/components/CategoryPageSkeleton.tsx`

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPageSkeleton() {
  return (
    <div className="py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        </div>
        <div className="flex gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <Skeleton key={i} className="h-80" />
        ))}
      </div>
    </div>
  );
}
```

---

## 🧪 Testes

```typescript
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCategories, useCategory } from '@/hooks/useCategories';

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

describe('useCategories', () => {
  it('should fetch categories', async () => {
    const { result } = renderHook(() => useCategories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toBeInstanceOf(Array);
  });
});

describe('useCategory', () => {
  it('should fetch category by slug', async () => {
    const { result } = renderHook(() => useCategory('tecnologia'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.slug).toBe('tecnologia');
  });
});
```

---

## ✅ Checklist de Implementação

- [ ] Criar tipos TypeScript em `category.types.ts`
- [ ] Implementar `categoryService` com todos os métodos
- [ ] Criar hooks em `useCategories.ts`
- [ ] Migrar `AppSidebar` para usar API
- [ ] Migrar `Categoria.tsx` para usar API
- [ ] Criar componente `CategoryCard`
- [ ] Criar página `Categorias.tsx` (listagem)
- [ ] Criar `CategoryPageSkeleton`
- [ ] Implementar suporte a subcategorias
- [ ] Adicionar estatísticas de categoria
- [ ] Implementar filtros e ordenação
- [ ] Adicionar testes unitários
- [ ] Testar cache do React Query
- [ ] Validar hierarquia de categorias

---

## 📚 Recursos

- [React Query Documentation](https://tanstack.com/query/latest)
- [API Integration Guide](../API_INTEGRATION.md)
- [TypeScript Types](../TYPES.md)

---

**Última atualização:** 24/11/2025
