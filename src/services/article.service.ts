import { apiClient } from './api.client';
import type { Article, PaginatedResponse } from '@/types/api.types';

/**
 * Article Service
 * Handles all article-related API operations
 */

/**
 * Get paginated list of published articles
 */
export async function getArticles(page = 1, perPage = 15): Promise<PaginatedResponse<Article>> {
  return apiClient.get<PaginatedResponse<Article>>('', { page: page.toString(), per_page: perPage.toString() });
}

/**
 * Get a single article by slug
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
  const response = await apiClient.get<{ data: Article }>(`/articles/${slug}`);
  return response.data;
}

/**
 * Search articles by query term
 */
export async function searchArticles(query: string, perPage = 15): Promise<PaginatedResponse<Article>> {
  return apiClient.get<PaginatedResponse<Article>>('/search', { q: query, per_page: perPage.toString() });
}

/**
 * Get related articles for a given article
 */
export async function getRelatedArticles(slug: string): Promise<Article[]> {
  const response = await apiClient.get<{ data: Article[] }>(`/articles/${slug}/related`);
  return response.data;
}

/**
 * Get articles by category slug
 */
export async function getArticlesByCategory(categorySlug: string, page = 1, perPage = 15): Promise<PaginatedResponse<Article>> {
  return apiClient.get<PaginatedResponse<Article>>(`/categories/${categorySlug}/articles`, { 
    page: page.toString(), 
    per_page: perPage.toString() 
  });
}

/**
 * Get articles by year and optional month
 */
export async function getArticlesByArchive(year: number, month?: number, perPage = 15): Promise<PaginatedResponse<Article>> {
  const endpoint = month ? `/archive/${year}/${month}` : `/archive/${year}`;
  return apiClient.get<PaginatedResponse<Article>>(endpoint, { per_page: perPage.toString() });
}
