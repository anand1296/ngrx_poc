import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { AppState } from '../app.state';
import { isAuthenticated } from '../components/auth/state/auth.selector';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.store.select(isAuthenticated).pipe(map((authenticated) => {
            if(!authenticated) {
                return this.router.createUrlTree(['auth']);
            }
            return true;
        }))
    }
}