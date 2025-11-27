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
