import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { AuthReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthEffects } from './state/auth.effects';
import { SignupComponent } from './signup/signup.component';
import { PasswordVisibilityTogglerDirective } from 'src/app/password-visibility-toggler.directive';

const routes: Routes = [
    { 
        path: '', 
        children: [
            { path: '', redirectTo: 'login' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ]
    }
]

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        PasswordVisibilityTogglerDirective,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature(),
        RouterModule.forChild(routes),
        // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)
    ]
})

export class AuthModule {}