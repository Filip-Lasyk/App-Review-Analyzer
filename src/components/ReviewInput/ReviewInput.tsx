import { useState } from 'react';
import { ApiError } from '../../api/types/ApiTypes';

interface ReviewInputProps {
  onSubmit: (appId: string, platform: 'ios' | 'android') => Promise<void>;
  isLoading: boolean;
}

export function ReviewInput({ onSubmit, isLoading }: ReviewInputProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const appStoreRegex = /\/id(\d+)(?:$|\/|\?)/;
      const playStoreRegex = /(?:id=|details\?id=)([\w.]+)/;

      let appId: string | null = null;
      let platform: 'ios' | 'android' | null = null;

      if (url.includes('apps.apple.com')) {
        const match = url.match(appStoreRegex);
        appId = match?.[1] || null;
        platform = 'ios';
      } else if (url.includes('play.google.com')) {
        const match = url.match(playStoreRegex);
        appId = match?.[1] || null;
        platform = 'android';
      }

      if (!appId || !platform) {
        throw new Error('Invalid app URL. Please check the URL and try again.');
      }

      await onSubmit(appId, platform);
    } catch (err) {
      console.error('URL processing error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste App Store or Play Store URL"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          disabled={isLoading}
        />
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <button 
          type="submit" 
          disabled={isLoading || !url}
          className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? 'Analyzing Reviews...' : 'Analyze Reviews'}
        </button>
      </form>
    </div>
  );
} 