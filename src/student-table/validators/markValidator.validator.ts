import { AbstractControl, ValidatorFn } from "@angular/forms";

export function markValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (isNaN(Number.parseFloat(control.value))) {
      return { "invalidMark": true };
    }

    return null;
  };
}
