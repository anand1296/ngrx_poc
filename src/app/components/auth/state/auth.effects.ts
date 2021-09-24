import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from '@ngrx/effects'
import { autoLogin, loginStart, loginSuccess, logout, signupStart, signupSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/shared/shared.actions";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { dispatch } from "rxjs/internal/observable/pairs";

@Injectable()

export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService,
        private store: Store<AppState>, private router: Router) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authService.login(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        this.store.dispatch(setErrorMessage({ message: '' }));
                        const user = this.authService.formatUser(data);
                        this.authService.setUserInLocalStorage(user);
                        return loginSuccess({ user, redirect: true });
                    }),
                    catchError((errResp) => {
                        console.log(errResp.error.error.message);
                        this.store.dispatch(setLoadingSpinner({ status: false }));
                        const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
                        return of(setErrorMessage({message: errorMessage}));
                    })
                );
            })
        );
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(loginSuccess), tap((action) => {
            console.log(action);
            this.store.dispatch(setErrorMessage({message: ''}));
            if(action.redirect){
                this.router.navigate(['/'])
            }
        }))
    }, {dispatch: false});

    signUp$ = createEffect(() => {
        return this.actions$.pipe(ofType(signupStart), exhaustMap((action) => {
            return this.authService.signUp(action.email, action.password).pipe(map((data) => {
                this.store.dispatch(setLoadingSpinner({status: false}));
                const user = this.authService.formatUser(data);
                this.authService.setUserInLocalStorage(user);
                return signupSuccess({user, redirect: true});
            }),
            catchError((errResp) => {
                console.log(errResp.error.error.message);
                this.store.dispatch(setLoadingSpinner({ status: false }));
                const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
                return of(setErrorMessage({message: errorMessage}));
            }));
        }));
    });

    signupRedirect$ = createEffect(() => {
        return this.actions$.pipe(ofType(signupSuccess), tap((action) => {
            console.log(action);
            this.store.dispatch(setErrorMessage({message: ''}))
            if(action.redirect){
                this.router.navigate(['/'])
            }
        }))
    }, {dispatch: false});

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(ofType(autoLogin), mergeMap((action) => {
            const user = this.authService.getUserFromLocalStorage();
            console.log(user);
            return of(loginSuccess({user, redirect: false}));
        }));
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(ofType(logout), map((action) => {
            this.authService.logout();
            this.router.navigate(['auth'])
        }))
    }, {dispatch: false} )

}