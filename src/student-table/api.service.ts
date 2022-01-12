import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment";
import {Student} from "./Student";

@Injectable({
  providedIn: "root"
})
export class APIService {

  constructor(private http: HttpClient) { }

  getData(): any {
    const url: string = environment.staticDataAPI;
    return this.http.get(url);
  }

  getDataSQL(): any {
    const url: string = environment.lifeDataAPI;
    return this.http.get(url);
  }

  postEdit(student: Student, studentID: number): any {
    console.log("postEdit request");
    const url: string = environment.lifeDataAPIEdit +
      `?studentName=${student.studentName}&surname=${student.surname}&fatherName=${student.fatherName}&birthDate=${student.birthDate}&severalMark=${student.severalMark}` +
      `&studentID=${studentID}`;
    return this.http.get(url);
  }

  postDelete(id: number): any {
    console.log("postDelete request");
    const url: string = environment.lifeDataAPIDelete +
      `?id=${id}`;

    return this.http.get(url);
  }

  postAdd(studentName: string,
          surname: string,
          fatherName: string,
          birthDate: Date,
          severalMark: number,
          id: number): any {
    console.log("postAdd request");
    const url: string = environment.lifeDataAPIAdd +
      `?studentName=${studentName}&surname=${surname}&fatherName=${fatherName}&birthDate=${birthDate}&severalMark=${severalMark}&id=${id}`

    return this.http.get(url);
  }
}
