import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCustom } from 'src/app/redux/actions/custom.action';
import { DateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  errorText = '';

  formSubmitted = false;

  createCardForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [
      Validators.maxLength(255),
    ]),
    img: new FormControl('', [
      Validators.required,
    ]),
    link: new FormControl('', [
      Validators.required,
    ]),
    tags: new FormArray([
      new FormControl('', [
        Validators.required,
      ]),
    ]),
    date: new FormControl('', [
      Validators.required,
      DateValidator(),
    ]),
  });

  getParamError(from: string) {
    const form = this.createCardForm.get(from) as FormControl;
    return form.errors ? Object.keys(form.errors || {})[0] : null;
  }

  getTagError(from: AbstractControl) {
    return from.errors ? Object.keys(from.errors || {})[0] : null;
  }

  addTagForm() {
    const tagsArray = this.createCardForm.get('tags') as FormArray;
    if (tagsArray.value.length < 5) {
      tagsArray.push(new FormControl('', [Validators.required]));
    }
  }

  getTags() {
    return this.createCardForm.get('tags') as FormArray;
  }

  formReset() {
    this.errorText = '';
    this.formSubmitted = false;

    this.createCardForm.reset();
    const tagsArray = this.createCardForm.get('tags') as FormArray;
    tagsArray.clear();
    tagsArray.push(new FormControl('', Validators.required));
  }

  formHandler() {
    this.errorText = '';
    this.formSubmitted = true;

    if (this.createCardForm.valid) {
      const id = this.createCardForm.value.link as string;
      this.store.dispatch(addCustom({
        [id]: {
          id,
          title: this.createCardForm.value.title as string,
          description: this.createCardForm.value.description as string,
          publishedAt: this.createCardForm.value.date as string,
          tags: this.createCardForm.value.tags as Array<string>,
          thumbnail: this.createCardForm.value.img as string,
        },
      }));
      this.router.navigate(['detail', id]);
    }
  }
}
