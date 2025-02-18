import { BaseReview } from './types/ApiTypes';
import { AppStoreApi } from './AppStoreApi';
import { PlayStoreApi } from './PlayStoreApi';

export class ReviewsApi {
  private appStoreApi: AppStoreApi;
  private playStoreApi: PlayStoreApi;

  constructor() {
    this.appStoreApi = new AppStoreApi();
    this.playStoreApi = new PlayStoreApi();
  }

  async fetchReviews(appId: string, platform: 'ios' | 'android'): Promise<BaseReview[]> {
    try {
      if (!appId) {
        throw new Error('App ID is required');
      }

      switch (platform) {
        case 'ios':
          return await this.appStoreApi.fetchReviews(appId);
        case 'android':
          return await this.playStoreApi.fetchReviews(appId);
        default:
          throw new Error('Unsupported platform');
      }
    } catch (error) {
      console.error('Review fetch error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch reviews'
      );
    }
  }
} 