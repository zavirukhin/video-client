import { AbstractControl, ValidatorFn } from '@angular/forms';

interface CustomPatternError {
  [key: string]: {
    value: unknown;
  };
}

export function CustomPatternValidator(regex: string, key: string): ValidatorFn {
  const regexExp = new RegExp(regex);
  return (control: AbstractControl): { [key: string]: unknown } | null => {
    const isValid = regexExp.test(control.value);
    if (isValid) {
      return null;
    }
    const error: CustomPatternError = {
      [key]: {
        value: control.value,
      },
    };
    return error;
  };
}
