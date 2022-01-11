import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { StudentTableModule } from "../student-table/student-table.module";
import { NotFoundComponent } from "./not-found.component";
import { StudentTableComponent } from "../student-table/studentTableTypes/student-table.component";
import { StudentTableSQLiteComponent } from "../student-table/studentTableTypes/student-table-sqlite.component";
import { HelpComponent } from './help.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "static", pathMatch: "full" },
  { path: "static", component: StudentTableComponent },
  { path: "lifeDB", component: StudentTableSQLiteComponent },
  { path: "help", component: HelpComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    StudentTableModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
