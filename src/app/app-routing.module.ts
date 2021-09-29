import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'counter', 
    loadChildren: () => import('./counterState/counter.module').then((m) => m.CounterModule),
  },
  {
    path: 'posts',
    loadChildren: () => import('./postState/posts.module').then((m) => m.PostsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth', 
    loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
