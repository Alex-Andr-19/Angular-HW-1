import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { MyFormComponent } from "./MyForm.component";
import { TableSettingsComponent } from "./table-settings.component";
import { StudentTableComponent } from "./student-table.component";
import { MyDatePipePipe } from "./my-date-pipe.pipe";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    MyFormComponent,
    TableSettingsComponent,
    StudentTableComponent,
    MyDatePipePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    StudentTableComponent,
    TableSettingsComponent
  ],
  providers: [],
  bootstrap: [StudentTableComponent]
})
export class StudentTableModule { }
