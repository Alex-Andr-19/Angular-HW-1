import { Component } from "@angular/core";
import { Student } from "./Student";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  title = "Angular";
  students: Student[] = [];

  constructor() {
    this.generateStudents();
  }

  getStudents(): Student[] {
    return this.students;
  }

  generateStudents(): void {
    const studentNames: string[] = ["Ivan", "Sergei", "Oleg", "Ilia"];
    const surnames: string[] = ["Shilov", "Moroshin", "Korchnoi", "Kolosov"];
    const fatherNames: string[] = ["Sergeevich", "Aleksandrovich", "Valerievich", "Igorevich"];
    const birthDates: Date[] = [
      new Date(1999, 2, 2),
      new Date(2001, 3, 23),
      new Date(2000, 5, 15),
      new Date(2000, 9, 16),
    ];
    const severalMarks: number[] = [4.3, 4.8, 3.9, 2.8];

    console.log(studentNames);
    for (let i: number = 0; i < studentNames.length; i++) {
      this.students.push(new Student(
        studentNames[i],
        surnames[i],
        fatherNames[i],
        birthDates[i],
        severalMarks[i],
      ));
    }
  }

  setClass(student: Student): string {
    let res: string = "";

    if (student.find) {
      res += "find ";
    }

    if (student.severalMark < 3) {
      res += "bad ";
    } else {
      res += "normal ";
    }

    return res;
  }

  filterStudents(markFilter: HTMLSelectElement): void {

    for (const student of this.students){
      console.log(student);
      if (markFilter.value === "all") {
        student.filtered = true;
      } else {
        student.filtered = !((markFilter.value === "twoToThree" && !(student.severalMark >= 2 && student.severalMark < 3)) ||
        (markFilter.value === "threeToFour" && !(student.severalMark >= 3 && student.severalMark < 4)) ||
        (markFilter.value === "fourToFive" && !(student.severalMark >= 4 && student.severalMark <= 5)));
      }
    }
    console.log();
  }

  deleteStudent(student: Student): void {
    student.deleted = true;
  }

  findStudent(name: string, param: string): void {
    if (name === "") {
      for (const student of this.students) {
        student.find = false;
      }
      return;
    }
    for (const student of this.students) {
      switch (param) {
        case "name":
          student.find = student.studentName.toLowerCase().includes(name.toLowerCase());
          break;
        case "surname":
          student.find = student.surname.toLowerCase().includes(name.toLowerCase());
          break;
        case "fatherName":
          student.find = student.fatherName.toLowerCase().includes(name.toLowerCase());
          break;
        case "birthDate":
          student.find = student.beautifulBirthDate().includes(name);
          break;
        default:
          break;
      }
    }
  }

  printElem(elem: HTMLSelectElement): string {
    console.log(elem.value);
    return "default";
  }
}
