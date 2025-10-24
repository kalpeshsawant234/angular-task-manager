import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Project } from 'src/app/models/models';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { id: 0, name: '', description: '' };

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.dataService.getProjects().subscribe(data => (this.projects = data));
  }

  addProject() {
  const projectToAdd = {
    id: this.newProject.id, 
    name: this.newProject.name,
    description: this.newProject.description
  };

  this.dataService.addProject(projectToAdd).subscribe((savedProject) => {
    this.newProject = { id: 0, name: '', description: '' };
    this.loadProjects();
  });
}

  deleteProject(id: number) {
  this.dataService.deleteProject(id).subscribe({
    next: () => this.loadProjects(),
    error: (err) => console.error('Delete failed', err)
  });
}

  editProject(project: Project) {
    const updatedName = prompt('Enter new project name:', project.name);
    const updatedDesc = prompt('Enter new description:', project.description);
    if (updatedName !== null) {
      const updatedProject: Project = {
      ...project,
      name: updatedName,
      description: updatedDesc ?? ''   
    };
      this.dataService.updateProject(updatedProject).subscribe(() => this.loadProjects());
    }
  }

  viewProject(id: number) {
    this.router.navigate(['/project', id]);
  }
}
