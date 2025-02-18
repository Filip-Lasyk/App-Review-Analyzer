import { useState } from 'react';
import { FilterCriteria, TaskSort, Priority, TaskType } from '../../api/types/ApiTypes';

interface TaskFiltersProps {
  onFilterChange: (filters: FilterCriteria) => void;
  onSortChange: (sort: TaskSort) => void;
}

export function TaskFilters({ onFilterChange, onSortChange }: TaskFiltersProps) {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<Priority | undefined>();
  const [type, setType] = useState<TaskType | undefined>();
  const [sort, setSort] = useState<TaskSort>({ field: 'priority', direction: 'desc' });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({ search: value, priority, type });
  };

  const handlePriorityChange = (value: Priority | undefined) => {
    setPriority(value);
    onFilterChange({ search, priority: value, type });
  };

  const handleTypeChange = (value: TaskType | undefined) => {
    setType(value);
    onFilterChange({ search, priority, type: value });
  };

  const handleSortChange = (field: TaskSort['field']) => {
    const newSort: TaskSort = {
      field,
      direction: sort.field === field ? 
        (sort.direction === 'asc' ? 'desc' : 'asc') : 
        'desc'
    };
    setSort(newSort);
    onSortChange(newSort);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={priority || ''}
          onChange={(e) => handlePriorityChange(e.target.value as Priority || undefined)}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:border-black focus:outline-none"
        >
          <option value="">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <select
          value={type || ''}
          onChange={(e) => handleTypeChange(e.target.value as TaskType || undefined)}
          className="px-3 py-2 rounded-lg border border-gray-200 focus:border-black focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="Bug">Bugs</option>
          <option value="Feature">Features</option>
          <option value="UX">UX Issues</option>
        </select>

        {/* Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => handleSortChange('priority')}
            className={`px-3 py-2 rounded-lg border ${
              sort.field === 'priority' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
            }`}
          >
            Priority {sort.field === 'priority' && (sort.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('date')}
            className={`px-3 py-2 rounded-lg border ${
              sort.field === 'date' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
            }`}
          >
            Date {sort.field === 'date' && (sort.direction === 'asc' ? '↑' : '↓')}
          </button>
          <button
            onClick={() => handleSortChange('type')}
            className={`px-3 py-2 rounded-lg border ${
              sort.field === 'type' ? 'bg-gray-100 border-gray-300' : 'border-gray-200'
            }`}
          >
            Type {sort.field === 'type' && (sort.direction === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>
    </div>
  );
} 