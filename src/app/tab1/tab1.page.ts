import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { Tasks } from '../models/tasks';
import { AlertController } from "@ionic/angular";
import { TasksC } from '../models/tasks-c';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public tasks: Tasks[];
  public task: Tasks;
  public taskC: TasksC;
  constructor(private taskService:TasksService, private alertController: AlertController) {
    this.task={
      task : ""
    }
    this.taskC={
      task : ""
    }
    this.taskService.getTasks().subscribe(res =>{
      this.tasks = res;
      console.log(this.tasks);
    });
  }

  public addTask() {
    this.taskService.addTask(this.task);
    this.task.task="";
    //this.tasks=this.taskService.getTasks();
  }
  public addTaskC(task : Tasks, id : string) {
    this.taskC.task = task.task;
    this.taskService.addTaskC(this.taskC,id);
    //this.tasks=this.taskService.getTasks();
  }
  public async removeTask(id : string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.taskService.removeTask(id);
          }
        }
      ]
    });

    await alert.present();

    //this.tasks = this.taskService.getTasks();
  }

}
