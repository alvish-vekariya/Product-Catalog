import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { loginGuard } from './core/guards/login.guard';
import { AuthLayoutComponent } from './authentication/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path :'auth',
    component : AuthLayoutComponent,
    loadChildren : ()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)
  },
  {
    path : '',
    component : LayoutComponent,
    loadChildren : ()=>import('./pages/pages.module').then(m=>m.PagesModule),
    canActivate : [loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
