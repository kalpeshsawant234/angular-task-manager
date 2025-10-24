import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Not Started',
    projectId: 1
  };

  constructor(private dataService: DataService) {}

  addTask() {
    if (this.task.title) {
      this.dataService.addTask(this.task);
      alert('Task added successfully!');
    }
  }
}

