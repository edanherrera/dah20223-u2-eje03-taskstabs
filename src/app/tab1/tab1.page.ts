import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: Tasks[];
  public task: string;

  constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(res =>{
      this.tasks = res;
      console.log(this.tasks);
    });
  }

  public addTask() {
    this.taskService.addTask(this.task);
    //this.tasks=this.taskService.getTasks();
    console.log(this.tasks);
    this.task='';
  }

  public removeTask(pos:number) {
    this.taskService.removeTask(pos);
    //this.tasks = this.taskService.getTasks();
  }

}
