import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Article, PaginatedResponse } from '@/types/api.types';
import { 
  getArticles, 
  getArticleBySlug, 
  searchArticles,
  getRelatedArticles,
  getArticlesByCategory,
  getArticlesByArchive
} from '@/services/article.service';

/**
 * Hook to fetch paginated list of articles
 */
export function useArticles(page = 1, perPage = 15): UseQueryResult<PaginatedResponse<Article>> {
  return useQuery({
    queryKey: ['articles', page, perPage],
    queryFn: () => getArticles(page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch a single article by slug
 */
export function useArticle(slug: string): UseQueryResult<Article> {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug,
  });
}

/**
 * Hook to search articles
 */
export function useSearchArticles(query: string, perPage = 15): UseQueryResult<PaginatedResponse<Article>> {
  return useQuery({
    queryKey: ['articles', 'search', query, perPage],
    queryFn: () => searchArticles(query, perPage),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!query && query.length >= 3,
  });
}

/**
 * Hook to fetch related articles
 */
export function useRelatedArticles(slug: string): UseQueryResult<Article[]> {
  return useQuery({
    queryKey: ['articles', 'related', slug],
    queryFn: () => getRelatedArticles(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug,
  });
}

/**
 * Hook to fetch articles by category
 */
export function useCategoryArticles(categorySlug: string, page = 1, perPage = 12): UseQueryResult<PaginatedResponse<Article>> {
  return useQuery({
    queryKey: ['articles', 'category', categorySlug, page, perPage],
    queryFn: () => getArticlesByCategory(categorySlug, page, perPage),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!categorySlug,
  });
}

/**
 * Hook to fetch articles by archive date
 */
export function useArchiveArticles(year: number, month?: number, perPage = 15): UseQueryResult<PaginatedResponse<Article>> {
  return useQuery({
    queryKey: ['articles', 'archive', year, month, perPage],
    queryFn: () => getArticlesByArchive(year, month, perPage),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}
