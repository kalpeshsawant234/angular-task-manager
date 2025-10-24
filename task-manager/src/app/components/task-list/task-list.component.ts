import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  projectId!: number;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
  }

  loadTasks(): void {
    this.dataService.getTasksByProject(this.projectId).subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    const newTask: Task = {
      id: 0,
      title: 'New Task',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Low',
      status: 'Not Started',
      projectId: this.projectId
    };

    this.dataService.addTask(newTask).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.dataService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
