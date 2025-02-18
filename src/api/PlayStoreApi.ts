import { BaseReview } from './types/ApiTypes';

const SERP_API_KEY = import.meta.env.VITE_SERP_API_KEY;
const BASE_URL = 'https://serpapi.com/search.json';
const PROXY_URL = 'https://api.allorigins.win/get?url=';

export class PlayStoreApi {
  async fetchReviews(appId: string): Promise<BaseReview[]> {
    try {
      if (!SERP_API_KEY) {
        console.error('SERP API key not found');
        throw new Error('API key is not configured');
      }

      const apiUrl = encodeURIComponent(
        `${BASE_URL}?engine=google_play_product&store=apps&product_id=${appId}&all_reviews=true&platform=phone&sort_by=2&num=40&api_key=${SERP_API_KEY}`
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
      
      if (!parsedData.reviews || parsedData.reviews.length === 0) {
        throw new Error('No Play Store reviews found');
      }

      return parsedData.reviews.map(review => ({
        author_hash: review.id || review.title,
        rating: review.rating,
        content: review.snippet,
        title: review.title,
        date: review.iso_date || review.date,
        lang: 'en',
        app_version: 'unknown'
      }));
    } catch (error) {
      console.error('Play Store review fetch error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to fetch Play Store reviews'
      );
    }
  }
} 