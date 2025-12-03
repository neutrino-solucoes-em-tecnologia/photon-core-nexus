import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import type { Category } from '@/types/api.types';

/**
 * Hook para buscar todas as categorias
 */
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: () => categoryService.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutos
    gcTime: 1000 * 60 * 60, // 1 hora (anteriormente cacheTime)
  });
}

/**
 * Hook para buscar top categorias (mais artigos) - usado no footer
 * Cache de 2 horas
 */
export function useTopCategories(limit: number = 5) {
  return useQuery<Category[], Error>({
    queryKey: ['categories', 'top', limit],
    queryFn: () => categoryService.getTopCategories(limit),
    staleTime: 1000 * 60 * 120, // 2 horas
    gcTime: 1000 * 60 * 180, // 3 horas
  });
}

/**
 * Hook para buscar uma categoria por slug
 */
export function useCategory(slug: string) {
  return useQuery<Category, Error>({
    queryKey: ['category', slug],
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
}
