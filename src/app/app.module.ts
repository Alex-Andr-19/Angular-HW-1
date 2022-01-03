import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { StudentTableModule } from "../student-table/student-table.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    StudentTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
