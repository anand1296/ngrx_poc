import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponseData } from '../models/AuthResponseData.model';
import { Observable } from "rxjs";
import { User } from '../models/user.model';
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { logout } from "../components/auth/state/auth.actions";

@Injectable({
  providedIn: 'root'
})

export class AuthService { 

  // login_endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  // signup_endpoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${environment.login_endpoint}?key=${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true})
  }

  signUp(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(`${environment.signup_endpoint}?key=${environment.FIREBASE_API_KEY}`, {email, password, returnSecureToken: true})
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message: string) {
    switch(message) {
      case 'EMAIL_NOT_FOUND': return 'Email Not Found';
        break;
      case 'INVALID_PASSWORD': return 'Invalid Password';
        break;
      case 'EMAIL_EXISTS': return 'Email already exists';
        break;
      case 'INVALID_EMAIL': return 'Email is invalid';
        break;
      default: return 'Unknown error occured. Please try again later.'
    }
  }

  setUserInLocalStorage(user: User) {
    
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if(userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(userData.email, userData.token, userData.localId, userData.expirationDate);
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = new Date(user.getExpiryDate).getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      //logout functionality or get the refreshed token
      this.store.dispatch(logout());
    }, timeInterval)
  }

  logout() {
    localStorage.removeItem('userData');
    if(this.timeoutInterval) {
      this.timeoutInterval = null;
    }
  }
}