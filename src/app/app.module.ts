import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
  MatDividerModule, MatSnackBarModule, matFormFieldAnimations } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import {
  NgbModule,
  NgbDateParserFormatter,
  NgbDateAdapter,
  NgbDateNativeAdapter
} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

import { ParentTaskService } from './addtask/services/parent-task.service';
import { TaskService } from './addtask/services/task.service';
import { AlertService } from './services/alert.service';

const routes: Routes = [
  { path: 'task', component: AddtaskComponent },
  { path: 'viewtask', component: ViewtaskComponent },
  { path: '', redirectTo: 'task', pathMatch: 'full' }
];


@NgModule({
  declarations: [AppComponent, AddtaskComponent, ViewtaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      toastClass: 'toast toast-bootstrap-compatibility-fix'
    }),
    NgbModule.forRoot()
  ],
  providers: [
    HttpClientModule,
    ToastrService,
    ParentTaskService,
    TaskService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
