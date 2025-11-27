# Documentação de Integração - Frontend React com Photon Media API

## 🎯 Visão Geral

Esta documentação detalha como integrar um frontend React com a API Photon Media Blog, com foco especial em **segurança da API key** para evitar exposição no cliente.

**Versão da API**: 1.0  
**Base URL**: `http://localhost:8000/api/blog`  
**Autenticação**: API Key via header `X-Site-Api-Key`

---

## 🔐 SEGURANÇA DA API KEY - ARQUITETURA RECOMENDADA

### ⚠️ NUNCA FAÇA ISSO (Inseguro):

```javascript
// ❌ ERRADO - API Key exposta no código frontend
const apiKey = 'sk_abc123...'; // Qualquer pessoa pode ver no código
fetch('http://api.example.com/blog', {
  headers: { 'X-Site-Api-Key': apiKey }
});
```

### ✅ SOLUÇÃO RECOMENDADA: Backend-for-Frontend (BFF)

Crie um **servidor intermediário** (BFF) entre seu React e a API. O React nunca tem acesso direto à API key.

```
┌─────────────┐      ┌──────────────┐      ┌─────────────────┐
│   React     │─────▶│  BFF Server  │─────▶│  Photon API     │
│  (Público)  │      │  (Privado)   │      │  (Backend)      │
│             │      │  Guarda      │      │                 │
│  Sem API    │      │  API Key     │      │  Valida API Key │
│  Key        │      │  Segura      │      │                 │
└─────────────┘      └──────────────┘      └─────────────────┘
```

---

## 🏗️ Arquitetura de Implementação

### Opção 1: BFF com Next.js (Recomendado)

Next.js possui API Routes nativas que rodam no servidor.

#### Estrutura do Projeto

```
my-blog-frontend/
├── .env.local                    # API key armazenada aqui (NÃO commitar)
├── next.config.js
├── package.json
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── blog/
│   │   │       ├── route.ts               # GET /api/blog
│   │   │       ├── search/route.ts        # GET /api/blog/search
│   │   │       ├── [slug]/route.ts        # GET /api/blog/articles/:slug
│   │   │       └── categories/route.ts    # GET /api/blog/categories
│   │   ├── blog/
│   │   │   ├── page.tsx                   # Homepage do blog
│   │   │   ├── [slug]/page.tsx            # Página do artigo
│   │   │   └── category/[slug]/page.tsx   # Página da categoria
│   │   └── layout.tsx
│   ├── lib/
│   │   ├── api.ts                         # Cliente API (chama BFF)
│   │   └── types.ts                       # TypeScript types
│   └── components/
│       ├── ArticleCard.tsx
│       ├── CategoryList.tsx
│       └── SearchBar.tsx
└── .gitignore                             # DEVE incluir .env.local
```

#### 1. Configuração de Variáveis de Ambiente

**`.env.local`** (NÃO commitar no Git):
```bash
# API Configuration
PHOTON_API_BASE_URL=http://localhost:8000/api/blog
PHOTON_API_KEY=sk_your_actual_api_key_here

# Next.js Public Variables (se necessário)
NEXT_PUBLIC_SITE_NAME=My Blog
```

**`.env.example`** (Commitar no Git como template):
```bash
# API Configuration
PHOTON_API_BASE_URL=http://localhost:8000/api/blog
PHOTON_API_KEY=sk_your_api_key_here

# Next.js Public Variables
NEXT_PUBLIC_SITE_NAME=My Blog
```

**`.gitignore`**:
```
# Environment variables
.env*.local
.env
```

#### 2. BFF API Routes (Next.js Server-Side)

**`src/app/api/blog/route.ts`** - Lista de artigos:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(request: NextRequest) {
  try {
    // Extrair query params do request do cliente
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '15';

    // Fazer request para a API real COM a API key (servidor-side)
    const response = await fetch(
      `${API_BASE_URL}?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!, // API key segura no servidor
        },
        cache: 'no-store', // ou 'force-cache' para otimização
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch articles' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Retornar dados para o cliente (sem expor API key)
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/search/route.ts`** - Busca de artigos:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    const perPage = searchParams.get('per_page') || '15';

    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Search failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Search Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/[slug]/route.ts`** - Artigo individual:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const response = await fetch(
      `${API_BASE_URL}/articles/${slug}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
        next: { revalidate: 3600 }, // Cache por 1 hora
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch article' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Article Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/[slug]/related/route.ts`** - Artigos relacionados:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const response = await fetch(
      `${API_BASE_URL}/articles/${slug}/related`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch related articles' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Related Articles Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/categories/route.ts`** - Lista de categorias:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
        next: { revalidate: 7200 }, // Cache por 2 horas
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Categories Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/categories/[slug]/articles/route.ts`** - Artigos por categoria:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '15';

    const response = await fetch(
      `${API_BASE_URL}/categories/${slug}/articles?page=${page}&per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch category articles' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Category Articles Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**`src/app/api/blog/archive/[year]/[month]/route.ts`** - Arquivo por data:
```typescript
import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { year: string; month?: string } }
) {
  try {
    const { year, month } = params;
    const searchParams = request.nextUrl.searchParams;
    const perPage = searchParams.get('per_page') || '15';

    const endpoint = month 
      ? `${API_BASE_URL}/archive/${year}/${month}`
      : `${API_BASE_URL}/archive/${year}`;

    const response = await fetch(
      `${endpoint}?per_page=${perPage}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Site-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch archive' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('BFF Archive Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### 3. TypeScript Types

**`src/lib/types.ts`**:
```typescript
// API Response Types
export interface Article {
  id: number;
  uuid: string;
  site_id: number;
  category_id: number | null;
  title: string;
  slug: string;
  description: string | null;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  image_url: string | null;
  image_alt: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  category?: Category;
  paragraphs?: Paragraph[];
}

export interface Paragraph {
  id: number;
  uuid: string;
  article_id: number;
  content: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  uuid: string;
  site_id: number;
  name: string;
  slug: string;
  description: string | null;
  status: 'active' | 'inactive';
  articles_count?: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
```

#### 4. Cliente API (Frontend)

**`src/lib/api.ts`** - Chama o BFF, não a API direta:
```typescript
import type { 
  Article, 
  Category, 
  PaginatedResponse, 
  ApiResponse 
} from './types';

// Base URL do BFF (Next.js API Routes)
const BFF_BASE_URL = '/api/blog';

class BlogApiClient {
  
  /**
   * Lista artigos publicados
   */
  async getArticles(page = 1, perPage = 15): Promise<PaginatedResponse<Article>> {
    const response = await fetch(
      `${BFF_BASE_URL}?page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return response.json();
  }

  /**
   * Busca artigos por termo
   */
  async searchArticles(query: string, perPage = 15): Promise<PaginatedResponse<Article>> {
    const response = await fetch(
      `${BFF_BASE_URL}/search?q=${encodeURIComponent(query)}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Search failed');
    }
    
    return response.json();
  }

  /**
   * Obtém artigo por slug
   */
  async getArticle(slug: string): Promise<ApiResponse<Article>> {
    const response = await fetch(`${BFF_BASE_URL}/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Article not found');
      }
      throw new Error('Failed to fetch article');
    }
    
    return response.json();
  }

  /**
   * Obtém artigos relacionados
   */
  async getRelatedArticles(slug: string): Promise<ApiResponse<Article[]>> {
    const response = await fetch(`${BFF_BASE_URL}/${slug}/related`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch related articles');
    }
    
    return response.json();
  }

  /**
   * Lista categorias ativas
   */
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await fetch(`${BFF_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  }

  /**
   * Obtém artigos por categoria
   */
  async getArticlesByCategory(
    categorySlug: string, 
    page = 1, 
    perPage = 15
  ): Promise<PaginatedResponse<Article>> {
    const response = await fetch(
      `${BFF_BASE_URL}/categories/${categorySlug}/articles?page=${page}&per_page=${perPage}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch category articles');
    }
    
    return response.json();
  }

  /**
   * Obtém artigos por data (ano/mês)
   */
  async getArchive(
    year: number, 
    month?: number, 
    perPage = 15
  ): Promise<PaginatedResponse<Article>> {
    const endpoint = month 
      ? `${BFF_BASE_URL}/archive/${year}/${month}`
      : `${BFF_BASE_URL}/archive/${year}`;
    
    const response = await fetch(`${endpoint}?per_page=${perPage}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch archive');
    }
    
    return response.json();
  }
}

// Singleton instance
export const blogApi = new BlogApiClient();
```

#### 5. Componentes React

**`src/app/blog/page.tsx`** - Homepage do blog (Server Component):
```typescript
import { blogApi } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import CategoryList from '@/components/CategoryList';
import SearchBar from '@/components/SearchBar';

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  
  // Server-side fetch (sem expor API key)
  const articlesData = await blogApi.getArticles(page);
  const categoriesData = await blogApi.getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      
      <SearchBar />
      
      <div className="grid grid-cols-12 gap-8 mt-8">
        {/* Artigos */}
        <div className="col-span-12 lg:col-span-8">
          {articlesData.data.length === 0 ? (
            <p>Nenhum artigo encontrado.</p>
          ) : (
            <>
              <div className="grid gap-6">
                {articlesData.data.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              
              {/* Paginação */}
              <div className="mt-8 flex justify-center gap-2">
                {articlesData.meta.prev && (
                  <a 
                    href={`/blog?page=${page - 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Anterior
                  </a>
                )}
                <span className="px-4 py-2">
                  Página {articlesData.meta.current_page} de {articlesData.meta.last_page}
                </span>
                {articlesData.meta.next && (
                  <a 
                    href={`/blog?page=${page + 1}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Próxima
                  </a>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <CategoryList categories={categoriesData.data} />
        </div>
      </div>
    </div>
  );
}
```

**`src/app/blog/[slug]/page.tsx`** - Página do artigo:
```typescript
import { blogApi } from '@/lib/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  try {
    const response = await blogApi.getArticle(params.slug);
    const article = response.data;
    
    return {
      title: article.title,
      description: article.description || undefined,
      openGraph: {
        title: article.title,
        description: article.description || undefined,
        images: article.image_url ? [article.image_url] : [],
      },
    };
  } catch {
    return {
      title: 'Artigo não encontrado',
    };
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  let article;
  let relatedArticles;
  
  try {
    const [articleResponse, relatedResponse] = await Promise.all([
      blogApi.getArticle(params.slug),
      blogApi.getRelatedArticles(params.slug),
    ]);
    
    article = articleResponse.data;
    relatedArticles = relatedResponse.data;
  } catch (error) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        {article.image_url && (
          <img 
            src={article.image_url} 
            alt={article.image_alt || article.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}
        
        <h1 className="text-5xl font-bold mb-4">{article.title}</h1>
        
        {article.description && (
          <p className="text-xl text-gray-600 mb-4">{article.description}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {article.category && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
              {article.category.name}
            </span>
          )}
          {article.published_at && (
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString('pt-BR')}
            </time>
          )}
        </div>
      </header>
      
      {/* Conteúdo */}
      <div className="prose prose-lg max-w-none mb-12">
        {article.paragraphs && article.paragraphs.length > 0 ? (
          article.paragraphs
            .sort((a, b) => a.order - b.order)
            .map((paragraph) => (
              <div 
                key={paragraph.id}
                dangerouslySetInnerHTML={{ __html: paragraph.content }}
              />
            ))
        ) : (
          <p>Conteúdo não disponível.</p>
        )}
      </div>
      
      {/* Artigos Relacionados */}
      {relatedArticles.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-3xl font-bold mb-6">Artigos Relacionados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedArticles.map((related) => (
              <a
                key={related.id}
                href={`/blog/${related.slug}`}
                className="block p-4 border rounded-lg hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{related.title}</h3>
                {related.description && (
                  <p className="text-gray-600 line-clamp-2">{related.description}</p>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
```

**`src/components/SearchBar.tsx`** - Componente de busca (Client Component):
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigos..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
```

**`src/components/ArticleCard.tsx`**:
```typescript
import type { Article } from '@/lib/types';
import Link from 'next/link';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      {article.image_url && (
        <img 
          src={article.image_url} 
          alt={article.image_alt || article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {article.category && (
            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {article.category.name}
            </span>
          )}
          {article.published_at && (
            <time className="text-sm text-gray-500">
              {new Date(article.published_at).toLocaleDateString('pt-BR')}
            </time>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-3">
          <Link 
            href={`/blog/${article.slug}`}
            className="hover:text-blue-600 transition"
          >
            {article.title}
          </Link>
        </h2>
        
        {article.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.description}
          </p>
        )}
        
        <Link 
          href={`/blog/${article.slug}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
}
```

**`src/components/CategoryList.tsx`**:
```typescript
import type { Category } from '@/lib/types';
import Link from 'next/link';

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Categorias</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link 
              href={`/blog/category/${category.slug}`}
              className="flex items-center justify-between p-2 rounded hover:bg-white transition"
            >
              <span>{category.name}</span>
              {category.articles_count !== undefined && (
                <span className="text-sm text-gray-500">
                  ({category.articles_count})
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Opção 2: BFF com Node.js/Express (React Puro)

Se você usar Create React App ou Vite sem Next.js, precisa de um servidor BFF separado.

### Estrutura do Projeto

```
blog-frontend/
├── backend/                    # BFF Server
│   ├── .env                    # API key aqui
│   ├── server.js
│   ├── routes/
│   │   └── blog.js
│   └── package.json
├── frontend/                   # React App
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   └── package.json
└── .gitignore
```

### Backend BFF (Node.js/Express)

**`backend/package.json`**:
```json
{
  "name": "blog-bff",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "node-fetch": "^3.3.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

**`backend/.env`**:
```bash
PHOTON_API_BASE_URL=http://localhost:8000/api/blog
PHOTON_API_KEY=sk_your_actual_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**`backend/server.js`**:
```javascript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/blog', blogRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`BFF Server running on port ${PORT}`);
});
```

**`backend/routes/blog.js`**:
```javascript
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const API_BASE_URL = process.env.PHOTON_API_BASE_URL;
const API_KEY = process.env.PHOTON_API_KEY;

// Helper function para fazer requests
async function proxyRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'X-Site-Api-Key': API_KEY,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// GET /api/blog - Lista artigos
router.get('/', async (req, res) => {
  try {
    const { page = 1, per_page = 15 } = req.query;
    const data = await proxyRequest(`?page=${page}&per_page=${per_page}`);
    res.json(data);
  } catch (error) {
    console.error('BFF Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/search - Busca artigos
router.get('/search', async (req, res) => {
  try {
    const { q, per_page = 15 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    const data = await proxyRequest(
      `/search?q=${encodeURIComponent(q)}&per_page=${per_page}`
    );
    res.json(data);
  } catch (error) {
    console.error('BFF Search Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/articles/:slug - Artigo individual
router.get('/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await proxyRequest(`/articles/${slug}`);
    res.json(data);
  } catch (error) {
    if (error.message.includes('404')) {
      return res.status(404).json({ error: 'Article not found' });
    }
    console.error('BFF Article Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/articles/:slug/related - Artigos relacionados
router.get('/articles/:slug/related', async (req, res) => {
  try {
    const { slug } = req.params;
    const data = await proxyRequest(`/articles/${slug}/related`);
    res.json(data);
  } catch (error) {
    console.error('BFF Related Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/categories - Lista categorias
router.get('/categories', async (req, res) => {
  try {
    const data = await proxyRequest('/categories');
    res.json(data);
  } catch (error) {
    console.error('BFF Categories Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/categories/:slug/articles - Artigos por categoria
router.get('/categories/:slug/articles', async (req, res) => {
  try {
    const { slug } = req.params;
    const { page = 1, per_page = 15 } = req.query;
    const data = await proxyRequest(
      `/categories/${slug}/articles?page=${page}&per_page=${per_page}`
    );
    res.json(data);
  } catch (error) {
    console.error('BFF Category Articles Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/blog/archive/:year/:month? - Arquivo por data
router.get('/archive/:year/:month?', async (req, res) => {
  try {
    const { year, month } = req.params;
    const { per_page = 15 } = req.query;
    
    const endpoint = month 
      ? `/archive/${year}/${month}`
      : `/archive/${year}`;
    
    const data = await proxyRequest(`${endpoint}?per_page=${per_page}`);
    res.json(data);
  } catch (error) {
    console.error('BFF Archive Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
```

### Frontend (React)

**`frontend/.env`**:
```bash
REACT_APP_BFF_URL=http://localhost:3001/api/blog
```

**`frontend/src/api/client.ts`** - Cliente que chama o BFF:
```typescript
const BFF_URL = process.env.REACT_APP_BFF_URL || 'http://localhost:3001/api/blog';

class BlogApiClient {
  async getArticles(page = 1, perPage = 15) {
    const response = await fetch(`${BFF_URL}?page=${page}&per_page=${perPage}`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return response.json();
  }

  async searchArticles(query: string, perPage = 15) {
    const response = await fetch(
      `${BFF_URL}/search?q=${encodeURIComponent(query)}&per_page=${perPage}`
    );
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  }

  async getArticle(slug: string) {
    const response = await fetch(`${BFF_URL}/articles/${slug}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Article not found');
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }

  async getRelatedArticles(slug: string) {
    const response = await fetch(`${BFF_URL}/articles/${slug}/related`);
    if (!response.ok) throw new Error('Failed to fetch related articles');
    return response.json();
  }

  async getCategories() {
    const response = await fetch(`${BFF_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }

  async getArticlesByCategory(categorySlug: string, page = 1, perPage = 15) {
    const response = await fetch(
      `${BFF_URL}/categories/${categorySlug}/articles?page=${page}&per_page=${perPage}`
    );
    if (!response.ok) throw new Error('Failed to fetch category articles');
    return response.json();
  }

  async getArchive(year: number, month?: number, perPage = 15) {
    const endpoint = month 
      ? `${BFF_URL}/archive/${year}/${month}`
      : `${BFF_URL}/archive/${year}`;
    
    const response = await fetch(`${endpoint}?per_page=${perPage}`);
    if (!response.ok) throw new Error('Failed to fetch archive');
    return response.json();
  }
}

export const blogApi = new BlogApiClient();
```

---

## 📋 Checklist de Segurança

Antes de fazer deploy, verifique:

- [ ] API key NUNCA está em código commitado no Git
- [ ] `.env.local` / `.env` está no `.gitignore`
- [ ] `.env.example` tem placeholders, não a key real
- [ ] BFF está validando todas as entradas do usuário
- [ ] Frontend chama APENAS o BFF, nunca a API direta
- [ ] Variáveis de ambiente são carregadas corretamente
- [ ] Logs não expõem a API key
- [ ] Rate limiting está configurado no BFF (opcional mas recomendado)
- [ ] HTTPS está habilitado em produção
- [ ] CORS está configurado corretamente (apenas frontend permitido)

---

## 🚀 Deploy

### Deploy do BFF (Next.js)

**Vercel** (recomendado para Next.js):
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy
vercel

# 4. Configurar variáveis de ambiente no painel Vercel
# Settings > Environment Variables
# PHOTON_API_BASE_URL=https://api.example.com/api/blog
# PHOTON_API_KEY=sk_production_key_here
```

### Deploy do BFF (Node.js/Express)

**Railway** ou **Render**:
```bash
# 1. Criar conta no Railway/Render
# 2. Conectar repositório Git
# 3. Configurar variáveis de ambiente:
#    - PHOTON_API_BASE_URL
#    - PHOTON_API_KEY
#    - FRONTEND_URL
#    - PORT (Railway define automaticamente)
# 4. Deploy automático no push
```

---

## 🧪 Testando a Integração

```typescript
// Teste manual no console do navegador
fetch('/api/blog')
  .then(r => r.json())
  .then(data => console.log('Artigos:', data));

// Verificar que a API key NÃO aparece nas DevTools > Network
```

---

## 📞 Endpoints Disponíveis

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/blog` | GET | Lista artigos publicados (paginado) |
| `/api/blog/search?q={termo}` | GET | Busca artigos por termo |
| `/api/blog/articles/:slug` | GET | Obtém artigo por slug |
| `/api/blog/articles/:slug/related` | GET | Artigos relacionados |
| `/api/blog/categories` | GET | Lista categorias ativas |
| `/api/blog/categories/:slug/articles` | GET | Artigos de uma categoria |
| `/api/blog/archive/:year/:month?` | GET | Artigos por data |
| `/api/blog/feed` | GET | RSS feed (XML) |
| `/api/blog/sitemap` | GET | Sitemap (XML) |

---

## 🎯 Resumo para IA (Claude Sonnet 4.5)

**Instruções para integração:**

1. **NUNCA exponha a API key no frontend**
2. **Crie um BFF** (Backend-for-Frontend) com Next.js API Routes ou Node.js/Express
3. **A API key fica no servidor** (arquivo `.env` ou `.env.local`)
4. **Frontend chama o BFF**, que adiciona a API key e chama a API real
5. **Use TypeScript** para type safety
6. **Implemente error handling** adequado
7. **Configure CORS** corretamente
8. **Use caching** quando apropriado (Next.js `revalidate`)

**Arquitetura:**
```
React (sem API key) → BFF (com API key) → Photon API
```

Esta documentação está completa e pronta para ser usada pela IA para implementar a integração de forma segura! 🔒
