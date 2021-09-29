import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { setLoadingSpinner } from 'src/app/shared/shared.actions';
import { loginStart, loginSuccess } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  showErrors(field: string) {
    const formField = this.loginForm.get(field);
    const casedFormField = field.charAt(0).toUpperCase()+field.slice(1);
    if(formField.touched && !formField.valid){
      if(formField.errors.required) {
        return casedFormField+' is required!'
      }

      if(formField.errors.email) {
        return casedFormField+' is invalid!'
      }      
    }
  }

  onSubmitLoginForm() {
    if(!this.loginForm.valid) {
      console.log('Invalid form!');
    }
    else {
      console.log(this.loginForm.value);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.store.dispatch(setLoadingSpinner({status: true}));
      this.store.dispatch(loginStart({email, password}));
      this.loginForm.reset();
    }
  }

  togglePassword(event) {
    event.preventDefault();
    this.showPassword = !this.showPassword;
  }

}
