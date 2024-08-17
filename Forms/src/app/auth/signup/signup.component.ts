import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime, first, of } from 'rxjs';

function mustContainQuestionMark(control: AbstractControl) {
  const value = control.value;

  if (value && value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true }
}

function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null)
  }
  return of({ notUnique: true })
}

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl(initialEmailValue,
      {
        validators: [Validators.email, Validators.required],
        asyncValidators: [emailIsUnique]
      }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
      })
    })
    ,
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),    ]),
    agree: new FormControl(false, { validators: [Validators.required] })
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched && this.form.controls.email.dirty
      && this.form.controls.email.invalid
    )
  }

  get passwordIsInvalid() {
    const passwordsGroup = this.form.get('passwords') as FormGroup;
    const passwordControl = passwordsGroup.get('password');

    return (
      passwordControl?.touched &&
      passwordControl?.dirty &&
      passwordControl?.invalid
    );
  }
  ngOnInit() {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          )
        }
      })
  }
  onSubmit(event: SubmitEvent) {
    if(this.form.invalid){
      console.log('INVALID FORM');
      return;
    }
    const submitter = event.submitter as HTMLButtonElement;
    if (submitter && submitter.type === 'submit') {
      console.log(this.form);
      const enteredEmail = this.form.value.email;
      const enteredPassword = this.form.value.passwords?.password;
      console.log(enteredEmail, enteredPassword)
    } else {
      return
    }
  }

  onReset() {
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}



