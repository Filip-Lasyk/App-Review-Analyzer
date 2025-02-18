import { Task } from '../../api/types/ApiTypes';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-medium">{task.title}</h3>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            task.priority === 'High' ? 'bg-red-100 text-red-700' :
            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            task.type === 'Bug' ? 'bg-red-100 text-red-700' :
            task.type === 'Feature' ? 'bg-blue-100 text-blue-700' :
            'bg-purple-100 text-purple-700'
          }`}>
            {task.type}
          </span>
        </div>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      {task.relatedReviews && task.relatedReviews.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Related Reviews:</h4>
          <div className="space-y-2">
            {task.relatedReviews.map((review, index) => (
              <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                "{review.content}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 