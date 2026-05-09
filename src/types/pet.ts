export interface Pet {
  id: number | string;
  image_url: string;
  title: string;
  description: string;
  created_at: string;
}

export type SortOption =
  | 'name-asc'
  | 'name-desc'
  | 'date-desc'
  | 'date-asc';

export interface ToastMessage {
  id: number;
  message: string;
  tone?: 'info' | 'success' | 'error';
}

