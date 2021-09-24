import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { setLoadingSpinner } from 'src/app/shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSignUp() {
    console.log(this.signUpForm.value);
    if(!this.signUpForm.valid) {
      return
    }
    else {
      const email = this.signUpForm.value.email;
      const password = this.signUpForm.value.password;
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.store.dispatch(signupStart({email, password}));
    }
  }

  showErrors(field: string) {
    const formField = this.signUpForm.get(field);
    const casedFormField = field.charAt(0).toUpperCase()+field.slice(1);
    if(formField.touched && !formField.valid){
      if(formField.errors.required) {
        return casedFormField+' is required!'
      }

      if(formField.errors.email) {
        return casedFormField+' is invalid!'
      }

      if(formField.errors.minlength) {
        return casedFormField+' should be minimum 6 characters long'
      }
    }
  }
}
