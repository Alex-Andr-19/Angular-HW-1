import { AbstractControl, ValidatorFn } from "@angular/forms";

export function fioValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value.name === control.value.surname || control.value.name === control.value.fatherName) {
      return { "invalidName": true };
    }

    return null;
  };
}
