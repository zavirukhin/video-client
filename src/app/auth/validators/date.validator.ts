import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date = new Date(control.value);
    if (date < new Date() && !Number.isNaN(date)) {
      return null;
    }
    return { DateValidator: true };
  };
}
