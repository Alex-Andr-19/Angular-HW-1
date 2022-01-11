import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { MyFormComponent } from "./MyForm.component";
import { TableSettingsComponent } from "./table-settings.component";
import { StudentTableComponent } from "./studentTableTypes/student-table.component";
import { MyDatePipePipe } from "./my-date-pipe.pipe";
import { HttpClientModule } from "@angular/common/http";
import {StudentTableSQLiteComponent } from './studentTableTypes/student-table-sqlite.component';
import {RouterModule, Routes} from "@angular/router";
import {HelpComponent} from "../app/help.component";
import {NotFoundComponent} from "../app/not-found.component";
import { PreventEditPopUpComponent } from './preventPopUps/prevent-edit-pop-up.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "static", pathMatch: "full" },
  { path: "static", component: StudentTableComponent },
  { path: "lifeDB", component: StudentTableSQLiteComponent },
  { path: "help", component: HelpComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [
    MyDatePipePipe,
    MyFormComponent,
    StudentTableComponent,
    TableSettingsComponent,
    StudentTableSQLiteComponent,
    PreventEditPopUpComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    StudentTableComponent,
    StudentTableSQLiteComponent,
    TableSettingsComponent,
  ],
  providers: [],
  bootstrap: [StudentTableComponent]
})
export class StudentTableModule { }
