import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public tasks: string[];
  public task: string;

  constructor(private taskService:TasksService) {
   this.tasks = this.taskService.getTasksC();
   this.task = '';
  }

  public removeTask(pos:number) {
    this.taskService.removeTask(pos);
    this.tasks = this.taskService.getTasks();
  }

}
