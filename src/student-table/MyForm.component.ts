import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Student } from "./Student";
import { dateValidator } from "./validators/dateValidator.validator";
import { fioValidator } from "./validators/fioValidator.validator";
import { markValidator } from "./validators/markValidator.validator";
import {APIService} from "./api.service";

@Component({
  selector: "my-form",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./MyForm.component.html",
  styleUrls: ["./MyForm.component.css"]
})

export class MyFormComponent {
  inputForms: FormGroup = new FormGroup({
    fio: new FormGroup({
      name: new FormControl(""),
      surname: new FormControl(""),
      fatherName: new FormControl(""),
    }, [Validators.required, fioValidator()]),
    birthDate: new FormControl("", [Validators.required, dateValidator()]),
    mark: new FormControl("", [Validators.required, markValidator()]),
  });
  isValid: boolean;

  @Input()
  public rootStudent: Student[] = [];
  @Input()
  public showStudent: Student[] = [];
  @Input()
  public selectedStudent: number = -1;
  @Input()
  public isEditing: boolean = false;
  @Input()
  public lifeDB: boolean = false;

  @Output()
  public validatedClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private server: APIService) {
    this.isValid = true;
  }

  submitForm(ev: SubmitEvent): void {
    ev.preventDefault();
    if (this.inputForms.valid) {
      this.isValid = true;
      const newStudentProps: any[] = [];
      for (const el in this.inputForms.getRawValue()) {
        // @ts-ignore
        const tmpInput: object | string = this.inputForms.get(el).value;
        newStudentProps.push(tmpInput);
      }
      const newStudent: Student = new Student(
        newStudentProps[0].name,
        newStudentProps[0].surname,
        newStudentProps[0].fatherName,
        new Date(newStudentProps[1]),
        Number.parseFloat(newStudentProps[2]),
      );
      if (ev.submitter?.innerText === "Add") {
        this.server.postAdd(
          newStudent.studentName,
          newStudent.surname,
          newStudent.fatherName,
          newStudent.birthDate,
          newStudent.severalMark,
          this.rootStudent.length + 1
        ).subscribe(
          (res: object) => {
            console.log(res);
          },
          (er: object) => {
            console.log("ERR:", er);
          },
        );
        this.rootStudent.push(newStudent);
        this.showStudent.push(newStudent);
      } else {
        const editedStudent: Student = this.showStudent[this.selectedStudent - 1];
        let rootIndexEditedStudent: number = -1;
        for (let i: number = 0; i < this.rootStudent.length; i++) {
          if (this.rootStudent[i].isEqual(editedStudent)) {
            rootIndexEditedStudent = i;
            break;
          }
        }

        if (this.lifeDB) {
          this.server.postEdit(newStudent, this.selectedStudent).subscribe(
            (res: object) => {
              console.log(res);
            },
            (er: object) => {
              console.log("ERR:", er);
            },
          );
        }
        this.showStudent[this.selectedStudent - 1] = newStudent;
        this.rootStudent[rootIndexEditedStudent] = newStudent;
      }
    } else {
      this.isValid = false;
    }
    if (ev.submitter?.innerText === "Clear") {
      for (const el in this.inputForms.getRawValue()) {
        if (el === "fio") {
          this.inputForms.get("fio")?.get("name")?.setValue("");
          this.inputForms.get("fio")?.get("name")?.markAsPristine();
          this.inputForms.get("fio")?.get("surname")?.setValue("");
          this.inputForms.get("fio")?.get("surname")?.markAsPristine();
          this.inputForms.get("fio")?.get("fatherName")?.setValue("");
          this.inputForms.get("fio")?.get("fatherName")?.markAsPristine();
        } else {
          this.inputForms.get(el)?.setValue("");
          this.inputForms.get(el)?.markAsPristine();
        }
      }
    }

    if (this.isValid) {
      this.validatedClick.emit(true);
    }
  }

  runChangeDetection(): void { }
}
