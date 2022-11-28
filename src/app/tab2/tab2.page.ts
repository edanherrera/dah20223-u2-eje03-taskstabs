import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { TasksC } from '../models/tasks-c';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public tasks: TasksC[];
  public task: string;

  constructor(private taskService:TasksService) {
    this.taskService.getTasks().subscribe(res =>{
      this.tasks = res;
      console.log(this.tasks);
    });
  }

  public removeTask(pos:number) {
    this.taskService.removeTaskC(pos);
    //this.tasks = this.taskService.getTasksC();
  }

}
