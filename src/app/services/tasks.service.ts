import { Injectable } from '@angular/core';
import { Tasks } from '../models/tasks';
import { TasksC } from '../models/tasks-c';

import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasks: Tasks[];
  private tasksC: TasksC[];

  constructor(private firestore:AngularFirestore) { 
    // this.tasks.push("Tarea 1");
    // this.tasks.push("Tarea 2");
    this.tasks = [];
    this.tasksC = [];
  }

  public getTasks():Observable<Tasks[]> {
    return this.firestore.collection('Tasks').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Tasks;
          console.log(data);

          const id = a.payload.doc.id;
          return {id,...data}
        });
      }));
  }
  public getTasksC():Observable<TasksC[]>{
    return this.firestore.collection('TasksC').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as TasksC;
          console.log(data);

          const id = a.payload.doc.id;
          return {id,...data}
        });
      }));
  }
  public addTask(task:string) {
    //this.tasks.push(task);
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
