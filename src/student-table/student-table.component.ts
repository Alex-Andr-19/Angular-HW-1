import {ChangeDetectionStrategy, Component, Input, OnInit} from "@angular/core";
import { Student } from "./Student";
import { APIService } from "./api.service";

@Component({
  selector: "app-student-table",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.css"]
})
export class StudentTableComponent implements OnInit {
  rootStudents: Student[] = [];
  showStudents: Student[] = [];

  @Input() public enableToNoticeBadMarks: boolean = true;

  showPopUp: boolean = false;
  showPopUpForm: boolean = false;
  tryToDelStudent: Student = new Student("a", "b", "c", new Date(), 0);
  tryToEditStudent: boolean = false;
  selectedStudent: number = -1;
  tryToAddStudent: boolean = false;

  sortParams: { [key: string]: number } = {
    "name": 0,
    "surname": 0,
    "fatherName": 0,
    "birthDate": 0,
    "marks": 0
  };

  tmpAPIData: object = {};

  constructor(private service: APIService) {
    this.createStudents();
  }

  ngOnInit() {
    this.getDataByAPI();
  }

  getDataByAPI() {
    this.service.getData().subscribe(
      (res: object) => {
        this.tmpAPIData = res;
      },
      (er: object) => {
        console.log("ERR:", er);
      }
    )

  }

  createStudents(): void {
    setTimeout(() => {
      console.log("DB is uploaded");

      // @ts-ignore
      const studentNames: string[] = this.tmpAPIData.names;
      // @ts-ignore
      const surnames: string[] = this.tmpAPIData.surnames;
      // @ts-ignore
      const fatherNames: string[] = this.tmpAPIData.fatherNames;
      const birthDates: Date[] = [];
      // @ts-ignore
      for (let i: number = 0; i < this.tmpAPIData.birthDates.length; i++) {
        birthDates.push(new Date(
          // @ts-ignore
          this.tmpAPIData.birthDates[i].year,
          // @ts-ignore
          this.tmpAPIData.birthDates[i].month,
          // @ts-ignore
          this.tmpAPIData.birthDates[i].date,
          ))
      }
      // @ts-ignore
      const severalMarks: number[] = this.tmpAPIData.severalMarks;

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

    console.log(this.showStudents);

      this.selectedStudent = 0;
      this.selectedStudent = -1;
    }, 430)
  }

  getStudents(): Student[] {
    return this.showStudents;
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

  getShowPopUpForm(): boolean {
    return this.showPopUpForm;
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

  togglePopUpForm(flag: string = "add", selectedStudentNum?: number): void {
    this.showPopUpForm = !this.showPopUpForm;
    if (flag === "add") {
      this.tryToAddStudent = !this.tryToAddStudent;
    } else {
      this.tryToEditStudent = !this.tryToEditStudent;
    }

    const tmp: number | undefined = selectedStudentNum;
    if (tmp) {
      this.selectedStudent = tmp;
    }
  }

  getTryToEditStudent(): boolean {
    return this.tryToEditStudent;
  }

  getTryToAddStudent(): boolean {
    return this.tryToAddStudent;
  }

  runChangeDetection(): void {
    console.log('Checking view from -- studentTable -- !!!');
  }
}