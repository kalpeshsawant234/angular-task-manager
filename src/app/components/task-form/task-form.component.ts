import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Output() submitTask = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || '', Validators.required],
      status: [this.task?.status || 'pending', Validators.required],
      priority: [this.task?.priority || 'medium', Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task: Task = {
        ...formValue,
        id: this.task?.id,
        createdAt: this.task?.createdAt || new Date().toISOString().split('T')[0]
      };
      this.submitTask.emit(task);
      this.taskForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.taskForm.reset();
  }
}