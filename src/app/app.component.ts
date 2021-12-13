import { Component } from "@angular/core";
import { Student } from "./Student";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  title = "Angular";

  rootStudents: Student[] = [];
  showStudents: Student[] = [];

  showPopUp: boolean = false;
  tryToDelStudent: Student = new Student('a', 'b', 'c', new Date(), 0);

  enableToNoticeBadMarks: boolean = true;

  constructor() {
    this.generateStudents();
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
      this.rootStudents.push(new Student(
        studentNames[i],
        surnames[i],
        fatherNames[i],
        birthDates[i],
        severalMarks[i],
      ));
      this.showStudents.push(this.rootStudents[i]);
    }
  }

  getStudents(): Student[] {
    return this.showStudents;
  }

  getNoticeBadMarks(): boolean {
    return this.enableToNoticeBadMarks;
  }

  toggleNoticeBadMarks(): void {
    this.enableToNoticeBadMarks = !this.enableToNoticeBadMarks;
  }

  setClass(student: Student): string {
    let res: string = "";

    if (student.find) {
      res += "find ";
    }

    if (student.severalMark < 3 && this.enableToNoticeBadMarks) {
      res += "bad ";
    } else {
      res += "normal ";
    }

    return res;
  }

  filterStudentsByMarks(markFilter: HTMLSelectElement): void {
    this.showStudents = [];

    for (const student of this.rootStudents){
      if (markFilter.value === "all") {
        student.filtered = true;
      } else {
        student.filtered = !((markFilter.value === "twoToThree" && !(student.severalMark >= 2 && student.severalMark < 3)) ||
        (markFilter.value === "threeToFour" && !(student.severalMark >= 3 && student.severalMark < 4)) ||
        (markFilter.value === "fourToFive" && !(student.severalMark >= 4 && student.severalMark <= 5)));
      }

      if (student.filtered && !student.deleted) {
        this.showStudents.push(student);
      }
    }
    console.log(this.showStudents);
  }

  filterStudentsByDate(date: HTMLInputElement): void {
    this.showStudents = [];
    let selectDate: Date = new Date(date.value);

    for (const student of this.rootStudents) {
      student.filtered = selectDate < student.birthDate;
      if (student.filtered && !student.deleted) {
        this.showStudents.push(student);
      }
    }
    console.log();
  }

  deleteStudent(): void {

    this.showStudents = [];

    this.tryToDelStudent.deleted = true;

    for (let localStudent of this.rootStudents) {
      if (!localStudent.deleted) {
        this.showStudents.push(localStudent);
      }
    }

    this.togglePopUp();
  }

  findStudent(name: string, param: string): void {
    if (name === "") {
      for (const student of this.rootStudents) {
        student.find = false;
      }
      return;
    }
    for (const student of this.rootStudents) {
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
        default:
          break;
      }
    }
  }

  getShowPopUp(): boolean {
    return this.showPopUp;
  }

  togglePopUp(student?: Student): void {
    if (student) {
      this.tryToDelStudent = student;
    }
    this.showPopUp = !this.showPopUp;
  }

  clearFilters(): void {
    this.showStudents = [];
    for (let student of this.rootStudents) {
      student.find = false;
      student.filtered = true;
      student.deleted = false;

      this.showStudents.push(student);
    }
  }
}
