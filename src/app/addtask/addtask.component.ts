import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, ParentTask } from '../../models/task';
import { TaskService } from './services/task.service';
import { AlertService } from '../services/alert.service';
import { ParentTaskService } from './services/parent-task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  today = new Date();

  taskId: any = null;

  taskStartDate = moment(new Date(this.today)).format('YYYY-MM-DD');
  taskEndDate = moment(new Date(this.today)).format('YYYY-MM-DD');

  task = <Task>{
    Task: '',
    Priority: 0,
    Start_Date: moment(new Date(this.today)).format('YYYY-MM-DD'),
    End_Date: moment(new Date(this.today)).format('YYYY-MM-DD')
  };
  isParentTask: false;

  constructor(
    private parentTaskService: ParentTaskService,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    // set taskId that is sent from Edit Task
    this.route.queryParams.subscribe(params => {
      this.taskId = params['taskId'];
    });

    if (this.taskId) {
      // load the task for update
      this.taskService.getTask(this.taskId).subscribe(response => {
        this.task = response.Data;

        const startDateSource = moment(this.task.Start_Date).toDate();
        this.taskStartDate = moment(new Date(startDateSource)).format(
          'YYYY-MM-DD'
        );

        const endDateSource = moment(this.task.End_Date).toDate();
        this.taskEndDate = moment(new Date(endDateSource)).format('YYYY-MM-DD');
      });
    }
  }
  reset() {
    this.taskStartDate = moment(this.today.toString()).format('YYYY-MM-DD');
    this.taskEndDate = moment(this.today.toString()).format('YYYY-MM-DD');

    this.task = <Task>{
      Task: null,
      Priority: 0,
      Start_Date: this.taskStartDate,
      End_Date: Date()
    };

    this.isParentTask = false;
    this.taskId = null;
  }
  addTask() {
    if (this.isParentTask) {
      // create parent task
      const newParent = <ParentTask>{
        Parent_Task: this.task.Task
      };

      this.parentTaskService.addParentTask(newParent).subscribe(response => {
        if (response.Success === true) {
          this.alertService.success(
            'Parent Task Added successfully!',
            'SUCCESS',
            3000
          );
          this.reset();
        } else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
    } else {
      this.task.Start_Date = this.taskStartDate.toString();
      this.task.End_Date = this.taskEndDate.toString();

      // create individual task with or without linked to parent task
      this.taskService.addTask(this.task).subscribe(response => {
        if (response.Success === true) {
          this.alertService.success(
            'New Task Added Successfuly!',
            'SUCCESS',
            3000
          );
          this.reset();
        } else {
          this.alertService.error(response.Message, 'Error', 3000);
        }
      });
    }
  }

  updateTask() {
    this.task.Start_Date = this.taskStartDate.toString();
    this.task.End_Date = this.taskEndDate.toString();

    this.taskService.editTask(this.task).subscribe(response => {
      if (response.Success === true) {
        this.alertService.success('Task Updated successfuly!', 'Success', 3000);
        this.reset();
      } else {
        this.alertService.error(response.Message, 'Error', 3000);
      }
    });
  }
}
