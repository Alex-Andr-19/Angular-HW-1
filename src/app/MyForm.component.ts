import {Attribute, Component, Input} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Student } from "./Student";
import {dateValidator} from "./dateValidator.validator";
import {fioValidator} from "./fioValidator.validator";
import {markValidator} from "./markValidator.validator";
import {numberValidator} from "./numberValidator.validator";

@Component({
  selector: "my-form",
  templateUrl: "./MyForm.component.html",
  styleUrls: ["./MyForm.component.css"]
})

export class MyFormComponent {
  numberForm: FormGroup = new FormGroup({
    number: new FormControl("", [numberValidator()]),
  })
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
  correctYearsOld: boolean;
  correctName: boolean;
  isEditing: boolean = false;

  @Input()
  public rootStudent: Student[] = [];
  @Input()
  public showStudent: Student[] = [];

  constructor(@Attribute('is-editing') ie: string) {
    this.isValid = true;
    this.correctYearsOld = true;
    this.correctName = true;
    this.isEditing = ie[0] === "t";

    console.log("Form constructor is finished");
  }

  submitForm(ev: SubmitEvent): void {
    ev.preventDefault();
    if (this.inputForms.valid) {
      const newStudentProps: any[] = [];
      for (const el in this.inputForms.getRawValue()) {
        // @ts-ignore
        const tmpInput: string | object = this.inputForms.get(el).value;
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
        this.rootStudent.push(newStudent);
        this.showStudent.push(newStudent);
      } else {
        const editedStudent: Student = this.showStudent[Number.parseInt(this.numberForm.get("number")?.value) - 1];
        let rootIndexEditedStudent: number = -1;
        for (let i: number = 0; i < this.rootStudent.length; i++) {
          if (this.rootStudent[i].isEqual(editedStudent)) {
            rootIndexEditedStudent = i;
            break;
          }
        }

        this.showStudent[Number.parseInt(this.numberForm.get("number")?.value) - 1] = newStudent;
        this.rootStudent[rootIndexEditedStudent] = newStudent;
      }
    }
    if (ev.submitter?.innerText === "Clear") {
      console.log("Here!!!!")
      this.numberForm.get("number")?.setValue("");
      for (let el in this.inputForms.getRawValue()) {
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
  }
}
