import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../app/app.state'
import { getToken } from '../components/auth/state/auth.selector';

@Injectable()

export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(getToken).pipe(take(1), exhaustMap((token) => {
            if(!token) {
                return next.handle(req);
            }

            let modifiedReq = req.clone({
                params: req.params.append('auth', token)
            });
            return next.handle(modifiedReq);
        }))
    }
}