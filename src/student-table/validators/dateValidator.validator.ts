import { AbstractControl, ValidatorFn } from "@angular/forms";

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const curDate: Date = new Date();
    const tenYearsOld: Date = new Date(curDate.getFullYear() - 10, curDate.getMonth(), curDate.getDate());
    if (tenYearsOld.getTime() - new Date(control.value).getTime() < 0) {
      return { "invalidDate": true };
    }

    return null;
  };
}
