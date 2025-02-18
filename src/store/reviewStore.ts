import { create } from 'zustand';
import { ReviewsApi } from '../api/reviewsApi';
import { OpenAIAnalyzer } from '../services/openaiAnalyzer';
import { TaskManager } from '../services/taskManager';
import { 
  BaseReview, 
  Task, 
  FilterCriteria, 
  TaskSort 
} from '../api/types/ApiTypes';

interface ReviewStore {
  rawReviews: BaseReview[];
  tasks: Task[];
  filteredTasks: Task[];
  isLoading: boolean;
  error: string | null;
  analysisStatus: string;
  
  fetchAndAnalyzeReviews: (appId: string, platform: 'ios' | 'android') => Promise<void>;
  filterTasks: (criteria: FilterCriteria) => void;
  sortTasks: (sort: TaskSort) => void;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  rawReviews: [],
  tasks: [],
  filteredTasks: [],
  isLoading: false,
  error: null,
  analysisStatus: '',

  fetchAndAnalyzeReviews: async (appId: string, platform: 'ios' | 'android') => {
    set({ isLoading: true, error: null });
    const reviewsApi = new ReviewsApi();
    const analyzer = new OpenAIAnalyzer();

    try {
      const reviews = await reviewsApi.fetchReviews(appId, platform);
      set({ rawReviews: reviews, analysisStatus: 'Analyzing reviews...' });

      const tasks = await analyzer.analyzeReviews(reviews);
      set({ 
        tasks, 
        filteredTasks: tasks,
        isLoading: false,
        analysisStatus: ''
      });
    } catch (error) {
      console.error('Review analysis error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to analyze reviews',
        isLoading: false,
        analysisStatus: ''
      });
    }
  },

  filterTasks: (criteria: FilterCriteria) => {
    const { tasks } = get();
    const filtered = TaskManager.filterTasks(tasks, criteria);
    set({ filteredTasks: filtered });
  },

  sortTasks: (sort: TaskSort) => {
    const { filteredTasks } = get();
    const sorted = TaskManager.sortTasks(filteredTasks, sort);
    set({ filteredTasks: sorted });
  }
})); 