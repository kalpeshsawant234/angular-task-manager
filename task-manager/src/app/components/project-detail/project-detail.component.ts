import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Project, Task } from 'src/app/models/models';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', dueDate: '', priority: 'Low', status: 'Not Started', projectId: 0 };

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
  }

  loadTasks() {
    this.dataService.getTasksByProject(this.projectId).subscribe(data => (this.tasks = data));
  }

  addTask() {
    this.newTask.projectId = this.projectId;
    this.dataService.addTask(this.newTask).subscribe(() => {
      this.newTask = { id: 0, title: '', description: '', dueDate: '', priority: 'Low', status: 'Not Started', projectId: this.projectId };
      this.loadTasks();
    });
  }

  deleteTask(id: number) {
    this.dataService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}

