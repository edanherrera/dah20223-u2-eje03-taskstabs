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
      public addTask(task : Tasks) {
        //this.tasks.push(task);  
        return this.firestore.collection('Tasks').add(task);
      }
      public addTaskC(task : TasksC,  id : string) {
        this.firestore.collection('TasksC').add(task);
        this.removeTask(id);
      }
      public addTaskCToTasks(task : Tasks, id : string) {
        this.firestore.collection('Tasks').add(task);
        this.removeTaskC(id);
      }
      
      public removeTask(id : string){
        return this.firestore.collection('Tasks').doc(id).delete();
      }
      public removeTaskC(id : string){
        return this.firestore.collection('TasksC').doc(id).delete();
      }
    }
    