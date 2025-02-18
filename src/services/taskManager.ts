import { Task, Priority, TaskType, FilterCriteria, TaskSort } from '../api/types/ApiTypes';

export class TaskManager {
  static filterTasks(tasks: Task[], criteria: FilterCriteria): Task[] {
    return tasks.filter(task => {
      // Priority filter
      if (criteria.priority && task.priority !== criteria.priority) {
        return false;
      }

      // Type filter
      if (criteria.type && task.type !== criteria.type) {
        return false;
      }

      // Search filter
      if (criteria.search) {
        const searchTerm = criteria.search.toLowerCase();
        const searchableContent = `
          ${task.title} 
          ${task.description} 
          ${task.relatedReviews.map(r => r.content).join(' ')}
        `.toLowerCase();
        
        return searchableContent.includes(searchTerm);
      }

      return true;
    });
  }

  static sortTasks(tasks: Task[], sort: TaskSort): Task[] {
    return [...tasks].sort((a, b) => {
      const direction = sort.direction === 'asc' ? 1 : -1;
      
      switch (sort.field) {
        case 'priority':
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return (priorityOrder[a.priority] - priorityOrder[b.priority]) * direction;
        
        case 'date':
          return (a.createdAt.getTime() - b.createdAt.getTime()) * direction;
        
        case 'type':
          return a.type.localeCompare(b.type) * direction;
        
        default:
          return 0;
      }
    });
  }
} 