import React, { useState } from 'react';
import { AlertTriangle, Home, History, Settings, LightbulbIcon, PlayCircle } from 'lucide-react';
import { ReviewInput } from './components/ReviewInput/ReviewInput';
import { useReviewStore } from './store/reviewStore';
import { TaskCard } from './components/TaskCard/TaskCard';
import { TaskFilters } from './components/TaskFilters/TaskFilters';
import { FilterCriteria, TaskSort } from './api/types/ApiTypes';

function App() {
  const { 
    fetchAndAnalyzeReviews, 
    filterTasks, 
    sortTasks,
    isLoading, 
    error, 
    filteredTasks,
    rawReviews,
    analysisStatus 
  } = useReviewStore();

  const handleFilterChange = (criteria: FilterCriteria) => {
    filterTasks(criteria);
  };

  const handleSortChange = (sort: TaskSort) => {
    sortTasks(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Review Analysis Tool
        </h1>

        <ReviewInput onSubmit={fetchAndAnalyzeReviews} isLoading={isLoading} />

        {/* Status Messages */}
        {rawReviews.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p>Fetched {rawReviews.length} reviews</p>
            {analysisStatus && <p className="mt-2">{analysisStatus}</p>}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-xl">
            <p>{analysisStatus || 'Processing...'}</p>
          </div>
        )}

        {filteredTasks.length > 0 && (
          <div className="mt-8 space-y-6">
            <TaskFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;