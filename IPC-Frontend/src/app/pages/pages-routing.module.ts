import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path : 'admin',
    loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule),
    // canActivate : [adminGuard]
  },
  {
    path : 'user',
    loadChildren : ()=>import('./user/user.module').then(m=>m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
