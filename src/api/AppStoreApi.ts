import { BaseReview } from './types/ApiTypes';

const SERP_API_KEY = import.meta.env.VITE_SERP_API_KEY;
const BASE_URL = 'https://serpapi.com/search.json';
const PROXY_URL = 'https://api.allorigins.win/get?url=';

export class AppStoreApi {
  async fetchReviews(appId: string): Promise<BaseReview[]> {
    try {
      if (!SERP_API_KEY) {
        console.error('SERP API key not found');
        throw new Error('API key is not configured');
      }

      const apiUrl = encodeURIComponent(
        `${BASE_URL}?engine=apple_reviews&product_id=${appId}&api_key=${SERP_API_KEY}&sort=mostrecent&country=us`
      );
      
      console.log('Fetching from:', `${PROXY_URL}${apiUrl}`.replace(SERP_API_KEY, 'HIDDEN'));

      const response = await fetch(`${PROXY_URL}${apiUrl}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      
      if (!parsedData.reviews || !Array.isArray(parsedData.reviews)) {
        throw new Error('Invalid API response format');
      }

      return parsedData.reviews.map(review => ({
        author_hash: review.author?.author_id || review.author?.name || 'anonymous',
        rating: review.rating || 0,
        content: review.text || '',
        title: review.title || '',
        date: review.review_date || new Date().toISOString(),
        lang: 'en',
        app_version: review.reviewed_version || 'unknown'
      }));
    } catch (error) {
      console.error('App Store review fetch error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch App Store reviews'
      );
    }
  }
} 