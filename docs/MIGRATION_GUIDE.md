# Guia de Migração - Mock Data para API Laravel

## 📋 Visão Geral

Este guia fornece instruções passo a passo para migrar o Photon Media de dados mockados (hardcoded) para a integração completa com a API Laravel.

---

## 🎯 Objetivos da Migração

1. **Remover dados estáticos** dos componentes
2. **Implementar chamadas à API** com React Query
3. **Gerenciar cache e otimizações** de performance
4. **Tratamento robusto de erros** e loading states

---

## 📦 Dependências Necessárias

### Instalar Pacotes

```bash
npm install axios @tanstack/react-query
```

### Configurar package.json

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.17.0"
  }
}
```

---

## 🏗️ Estrutura de Arquivos

Criar a seguinte estrutura:

```
src/
├── services/
│   ├── api.ts              # Cliente Axios configurado
│   ├── article.service.ts  # Serviços de artigos
│   ├── category.service.ts # Serviços de categorias
│   ├── comment.service.ts  # Serviços de comentários
│   └── contact.service.ts  # Serviços de contato
├── hooks/
│   ├── useArticles.ts      # Hook para artigos
│   ├── useCategories.ts    # Hook para categorias
│   └── useComments.ts      # Hook para comentários
├── types/
│   ├── article.types.ts    # Tipos de artigos
│   ├── category.types.ts   # Tipos de categorias
│   └── api.types.ts        # Tipos gerais da API
└── utils/
    └── constants.ts        # Constantes da API
```

---

## 🔧 Implementação Passo a Passo

### **PASSO 1: Configurar Variáveis de Ambiente**

Criar arquivo `.env.local`:

```env
# API Configuration
VITE_API_BASE_URL=https://api.photonmedia.com.br/api/v1
VITE_API_TIMEOUT=10000

# Environment
VITE_ENV=development

# Google AdSense (já existentes)
VITE_ADSENSE_CLIENT_ID=ca-pub-8616282875609147
# ... demais configurações
```

---

### **PASSO 2: Criar Cliente API Base**

**Arquivo:** `src/services/api.ts`

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');

// Criar instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Interceptor de Response (trata erros globais)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 429) {
      // Rate limit excedido
      console.error('Rate limit excedido. Tente novamente em alguns instantes.');
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

---

### **PASSO 3: Definir Tipos TypeScript**

**Arquivo:** `src/types/article.types.ts`

```typescript
export interface Category {
  id: number;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  articles_count?: number;
}

export interface Tag {
  id: number;
  slug: string;
  name: string;
  articles_count?: number;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content?: string;
  featured_image: string;
  category: Category;
  tags?: Tag[];
  read_time: string;
  views: number;
  comments_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  meta?: {
    seo_title?: string;
    seo_description?: string;
    seo_keywords?: string[];
  };
}

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

export interface ArticlesParams {
  page?: number;
  per_page?: number;
  category?: string;
  tag?: string;
  search?: string;
  sort?: 'latest' | 'oldest' | 'popular' | 'trending';
  featured?: boolean;
}
```

---

### **PASSO 4: Criar Serviços da API**

**Arquivo:** `src/services/article.service.ts`

```typescript
import api from './api';
import { Article, PaginatedResponse, ArticlesParams } from '@/types/article.types';

export const articleService = {
  // Lista artigos com paginação e filtros
  getArticles: async (params: ArticlesParams = {}): Promise<PaginatedResponse<Article>> => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  // Obtém um artigo por slug
  getArticleBySlug: async (slug: string): Promise<Article> => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  },

  // Obtém artigos em destaque (Hero)
  getFeaturedArticles: async (limit: number = 4): Promise<Article[]> => {
    const response = await api.get('/articles/featured', { 
      params: { limit } 
    });
    return response.data.data;
  },

  // Obtém destaques secundários
  getHighlights: async (limit: number = 4): Promise<Article[]> => {
    const response = await api.get('/articles/highlights', {
      params: { limit }
    });
    return response.data.data;
  },

  // Obtém últimas notícias
  getLatestNews: async (limit: number = 6, exclude: number[] = []): Promise<Article[]> => {
    const response = await api.get('/articles/latest', {
      params: { limit, exclude }
    });
    return response.data.data;
  },

  // Obtém artigos relacionados
  getRelatedArticles: async (slug: string, limit: number = 3): Promise<Article[]> => {
    const response = await api.get(`/articles/${slug}/related`, {
      params: { limit }
    });
    return response.data.data;
  },
};
```

---

### **PASSO 5: Criar Hooks Customizados**

**Arquivo:** `src/hooks/useArticles.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { Article, PaginatedResponse, ArticlesParams } from '@/types/article.types';
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

### **PASSO 6: Configurar React Query no App**

**Arquivo:** `src/App.tsx` (atualizar)

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* ... resto do app */}
    </TooltipProvider>
  </QueryClientProvider>
);
```

---

### **PASSO 7: Migrar Componentes**

#### **ANTES (Mock Data):**

**Home.tsx:**
```typescript
const featuredArticles = [
  {
    slug: 'futuro-ia-empresas',
    title: 'O Futuro da IA nas Empresas',
    // ... dados hardcoded
  },
];

export default function Home() {
  return (
    <div>
      {featuredArticles.map((article) => (
        <ArticleCard {...article} />
      ))}
    </div>
  );
}
```

#### **DEPOIS (Com API):**

```typescript
import { useFeaturedArticles, useHighlights, useLatestNews } from '@/hooks/useArticles';
import { Skeleton } from '@/components/ui/skeleton';

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

## 🧪 Testes

### Testar Chamadas à API

```bash
# Instalar ferramentas de teste
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Arquivo:** `src/services/__tests__/article.service.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { articleService } from '../article.service';
import api from '../api';

vi.mock('../api');

describe('Article Service', () => {
  it('should fetch articles', async () => {
    const mockData = {
      data: [{ id: 1, slug: 'test', title: 'Test Article' }],
      meta: { current_page: 1, total: 10 },
    };

    (api.get as any).mockResolvedValue({ data: mockData });

    const result = await articleService.getArticles({ page: 1 });

    expect(result).toEqual(mockData);
    expect(api.get).toHaveBeenCalledWith('/articles', { params: { page: 1 } });
  });
});
```

---

## 🐛 Troubleshooting

### Problema: CORS Error

**Solução:** Configurar CORS no backend Laravel:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['https://photonmedia.com.br'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

### Problema: Rate Limit Exceeded

**Solução:** Implementar retry com exponential backoff:

```typescript
import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response?.status === 429;
  },
});
```

---

## ✅ Checklist de Migração

- [ ] Instalar dependências (axios, react-query)
- [ ] Criar arquivo `.env.local` com variáveis de ambiente
- [ ] Implementar cliente API (`api.ts`)
- [ ] Definir tipos TypeScript (article, category, api)
- [ ] Implementar serviços (article, category, comment)
- [ ] Criar hooks customizados (useArticles, useCategories)
- [ ] Configurar React Query no App
- [ ] Migrar componente Home
- [ ] Migrar componente Categoria
- [ ] Migrar componente Artigo
- [ ] Implementar loading states (skeletons)
- [ ] Implementar error states
- [ ] Testar paginação
- [ ] Testar filtros de categoria
- [ ] Verificar cache do React Query
- [ ] Testar em produção

---

## 📚 Recursos Adicionais

- [Documentação React Query](https://tanstack.com/query/latest)
- [Documentação Axios](https://axios-http.com/)
- [API Integration Documentation](./API_INTEGRATION.md)

---

**Última atualização:** 24/11/2025
