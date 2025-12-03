import { apiClient } from './api.client';
import type { Category, ApiResponse } from '@/types/api.types';

class CategoryService {
  /**
   * Lista todas as categorias ativas
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  /**
   * Obtém as top 5 categorias com mais artigos (para footer)
   * Cache: 2 horas
   */
  async getTopCategories(limit: number = 5): Promise<Category[]> {
    try {
      const response = await apiClient.get<ApiResponse<Category[]>>('/categories', {
        params: {
          sort: 'articles_count',
          order: 'desc',
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top categories:', error);
      // Fallback: retorna categorias normais em caso de erro
      return this.getCategories().then(cats => cats.slice(0, limit));
    }
  }

  /**
   * Obtém uma categoria por slug
   */
  async getCategoryBySlug(slug: string): Promise<Category> {
    try {
      const response = await apiClient.get<ApiResponse<Category>>(`/categories/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
