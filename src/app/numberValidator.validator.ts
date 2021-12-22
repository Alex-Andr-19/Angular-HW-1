import { AbstractControl, ValidatorFn } from "@angular/forms";

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isNaN(Number.parseInt(control.value)) && control.value !== "") {
      return { "invalidNumber": true };
    }

    return null;
  };
}
