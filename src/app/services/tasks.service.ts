import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: string[] = [];
  private tasksC: string[] = [];

  constructor() { 
    this.tasks.push("Tarea 1");
    this.tasks.push("Tarea 2");
  }

  public getTasks():string[] {
    return this.tasks;
  }
  public getTasksC():string[] {
    return this.tasksC;
  }
  public addTask(task:string) {
    this.tasks.push(task);
  }

  public removeTask(pos:number){
    this.tasksC.push(this.tasks[pos]);
    this.tasks.splice(pos, 1);
  }
  public removeTaskC(pos:number){
    this.tasks.push(this.tasksC[pos]);
    this.tasksC.splice(pos, 1);
  }
}
