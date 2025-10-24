export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
  projectId: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
}