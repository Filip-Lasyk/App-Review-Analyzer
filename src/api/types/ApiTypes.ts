// Base types for Reviews
export interface BaseReview {
  author_hash: string;
  rating: number;
  content: string;
  title: string;
  date: string;
  lang: string;
  app_version: string;
}

// API Response types
export interface SerpApiResponse {
  search_information: {
    reviews_for_currrent_version?: number;
    total_page_count: number;
    results_count: number;
  };
  reviews: Array<{
    position: number;
    id?: string;
    title: string;
    text: string;
    rating: number;
    review_date: string;
    reviewed_version?: string;
    author: {
      name: string;
      author_id?: string;
    };
  }>;
}

// Task Management types
export type Priority = 'High' | 'Medium' | 'Low';
export type TaskType = 'Bug' | 'Feature' | 'UX';
export type SortField = 'priority' | 'date' | 'type';
export type SortDirection = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  type: TaskType;
  relatedReviews: BaseReview[];
  createdAt: Date;
}

export interface FilterCriteria {
  priority?: Priority;
  type?: TaskType;
  search?: string;
}

export interface TaskSort {
  field: SortField;
  direction: SortDirection;
}

// Error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public originalError?: unknown
  ) {
    super(message);
  }
}

export interface ReviewApiInterface {
  fetchReviews(appId: string): Promise<BaseReview[]>;
} 