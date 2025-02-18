import OpenAI from 'openai';
import { BaseReview, Task } from '../api/types/ApiTypes';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Enable browser usage
});

const ANALYSIS_PROMPT = `
You are an expert product manager analyzing app reviews in multiple languages. Analyze these reviews and generate actionable tasks.
Your responsibilities:
1. Understand reviews in different languages
2. Group similar issues across languages
3. Identify key themes and problems regardless of language
4. Assess sentiment and urgency in the cultural context

For each identified issue:
1. Create a clear, actionable title in English
2. Write a detailed description including:
   - The core problem or request
   - Impact on users
   - Language distribution of the issue
3. Set priority (High/Medium/Low) based on:
   - Frequency across languages
   - Severity of impact
   - User sentiment
   - Rating patterns
4. Categorize type (Bug/Feature/UX)
5. List indices of related reviews

Output format must be valid JSON:
{
  "tasks": [{
    "title": "string",
    "description": "string",
    "priority": "High" | "Medium" | "Low",
    "type": "Bug" | "Feature" | "UX",
    "relatedReviews": number[]
  }]
}
`;

export class OpenAIAnalyzer {
  async analyzeReviews(reviews: BaseReview[]): Promise<Task[]> {
    try {
      // Format reviews with language context
      const reviewsContext = reviews.map((review, index) => 
        `Review ${index}: [Rating: ${review.rating}, Language: ${review.lang}, Version: ${review.app_version}] ${review.content}`
      ).join('\n\n');

      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: ANALYSIS_PROMPT },
          { role: "user", content: reviewsContext }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const result = JSON.parse(response.choices[0].message.content);
      
      // Map the analyzed tasks to our Task interface
      return result.tasks.map((task: any) => ({
        id: crypto.randomUUID(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        type: task.type,
        relatedReviews: task.relatedReviews.map((index: number) => reviews[index]),
        createdAt: new Date()
      }));
    } catch (error) {
      console.error('OpenAI Analysis failed:', error);
      throw new Error('Failed to analyze reviews');
    }
  }
} 