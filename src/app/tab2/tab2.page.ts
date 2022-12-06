import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { TasksC } from '../models/tasks-c';
import { Tasks } from '../models/tasks';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  public tasks: TasksC[];
  public task: Tasks;
  constructor(private taskService:TasksService, private alertController : AlertController) {
    this.task={
      task : ""
    }
    this.taskService.getTasksC().subscribe(res =>{
      this.tasks = res;
      console.log(this.tasks);
    });
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
            this.taskService.removeTaskC(id);
          }
        }
      ]
    });

    await alert.present();
  }

  public addTask(task : Tasks, id : string){
    this.task.task = task.task;
    this.taskService.addTaskCToTasks(this.task,id);
  }

}
