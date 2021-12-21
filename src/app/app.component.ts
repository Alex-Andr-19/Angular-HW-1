import { Component } from "@angular/core";
import { Student } from "./Student";
import { FormControl, FormGroup } from "@angular/forms";
import {convertElementSourceSpanToLoc} from "@angular-eslint/template-parser/dist/template-parser/src/convert-source-span-to-loc";

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
  // Exemplar of temporary student, which client tries to delete
  tryToDelStudent: Student = new Student("a", "b", "c", new Date(), 0);

  enableToNoticeBadMarks: boolean = true;

  sortParams: { [key: string]: number } = {
    "name": 0,
    "surname": 0,
    "fatherName": 0,
    "birthDate": 0,
    "marks": 0
  };

  inputForms: FormGroup = new FormGroup({
    fio: new FormGroup({
      name: new FormControl(""),
      surname: new FormControl(""),
      fatherName: new FormControl(""),
    }),
    birthDate: new FormControl(""),
    mark: new FormControl(""),
  });
  correctYearsOld: boolean = true;
  correctName: boolean = true;

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
  }

  filterStudentsByDate(date: HTMLInputElement): void {
    this.showStudents = [];
    const selectDate: Date = new Date(date.value);

    for (const student of this.rootStudents) {
      student.filtered = selectDate < student.birthDate;
      if (student.filtered && !student.deleted) {
        this.showStudents.push(student);
      }
    }
  }

  deleteStudent(): void {

    this.showStudents = [];

    this.tryToDelStudent.deleted = true;

    for (const el of this.rootStudents) {
      if (!el.deleted) {
        this.showStudents.push(el);
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

  sortStudent(param: string): void {
    // @ts-ignore
    for (const key: string in this.sortParams) {
      if (key !== param) {
        this.sortParams[key] = 0;
      }
    }
    if (this.sortParams[param] !== -1) {
      this.showStudents.sort((a: Student, b: Student): number => {
        if (a.getProp(param) > b.getProp(param)) {
          return 1;
        } if (a.getProp(param) < b.getProp(param)) {
          return -1;
        }
        return 0;
      });

      if (this.sortParams[param] === 0) {
        this.sortParams[param] = 1;
      } else {
        this.sortParams[param] = -1;
        this.showStudents.reverse();
      }
    } else {
      this.sortParams[param] = 0;
      this.showStudents = [];
      for (const student of this.rootStudents) {
        if (student.filtered && !student.deleted) {
          this.showStudents.push(student);
        }
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

  clearFilters(...args: (HTMLInputElement | HTMLSelectElement)[]): void {
    for (const el of args) {
      el.value = el.tagName === "INPUT" ? "" : el.value = "all";
    }

    this.showStudents = [];
    for (const student of this.rootStudents) {
      student.find = false;
      student.filtered = true;
      student.deleted = false;

      this.showStudents.push(student);
    }

    // @ts-ignore
    for (const key: string in this.sortParams) {
      this.sortParams[key] = 0;
    }
  }

  submitForm(ev: InputEvent): void {
    ev.preventDefault();
    let validator: boolean = true;
    const newStudentProps: any[] = [];
    for (const el in this.inputForms.getRawValue()) {
      // @ts-ignore
      const tmpInput: string = this.inputForms.get(el).value;
      if (tmpInput === "") {
        validator = false;
        break;
      }
      // @ts-ignore
      newStudentProps.push(this.inputForms.get(el).value);
    }
    const curDate: Date = new Date();
    const tenYearsOld: Date = new Date(curDate.getFullYear() - 10, curDate.getMonth(), curDate.getDate());
    this.correctYearsOld = tenYearsOld.getTime() - new Date(newStudentProps[1]).getTime() >= 60 * 60 * 24 * 3650;
    this.correctName = newStudentProps[0].name !== newStudentProps[0].surname &&
      newStudentProps[0].name !== newStudentProps[0].fatherName;

    if (validator && this.correctYearsOld && this.correctName) {
      const newStudent: Student = new Student(
        newStudentProps[0].name,
        newStudentProps[0].surname,
        newStudentProps[0].fatherName,
        new Date(newStudentProps[1]),
        Number.parseFloat(newStudentProps[2]),
        );

      this.rootStudents.push(newStudent);
      this.showStudents.push(newStudent);
    }
    console.log(this.correctYearsOld);
    console.log(this.correctName);
  }
}
