// API Response Types

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
