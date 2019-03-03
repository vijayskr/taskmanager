import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../addtask/services/task.service';
import { AlertService } from '../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {
  Tasks: Task[];
  SortKey: string;
  taskID: number;

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  editTask(taskId: number) {
    this.taskService.getTask(taskId).subscribe(response => {
      if (response.Success === true) {
        this.router.navigate(['/task'], {
          queryParams: { taskId: taskId }
        });
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }

  endTask(taskId: number) {
    this.taskService.endTask(taskId).subscribe(response => {
      if (response.Success === true) {
        this.refreshList();
        this.alertService.success('Task ended successfully!', 'Success', 3000);
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }

  sortTask(sortKey: string) {
    this.SortKey = sortKey;
    this.taskService
      .getTasksList(this.taskID, sortKey)
      .subscribe(response => {
        if (response.Success === true) {
          this.Tasks = response.Data;
        } else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
  }

  refreshList() {
    // fetch all tasks associated to this project and display
    this.taskService
      .getTasksList(this.taskID, this.SortKey)
      .subscribe(response => {
        if (response.Success === true) {
          if (response.Data.length === 0) {
            this.alertService.warn(
              'No Tasks found:' + this.taskID,
              'Warning',
              3000
            );
          }

          this.Tasks = response.Data;
          console.log(this.Tasks);
        } else {
          this.alertService.error(
            'Error occured while fetching tasks :' +
              this.taskID,
            'Error',
            3000
          );
        }
      });
  }
}
