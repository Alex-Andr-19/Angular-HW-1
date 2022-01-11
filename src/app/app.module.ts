import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from "./app.component";
import { StudentTableModule } from "../student-table/student-table.module";
import { NotFoundComponent } from './not-found.component';
import { StudentTableComponent } from "../student-table/student-table.component";

const appRoutes: Routes = [
  { path: "", component: StudentTableComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    StudentTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
