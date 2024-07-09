import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CategoryComponent } from './category/category.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path : '',
    component : AdminDashboardComponent
  },
  {
    path : 'category',
    component : CategoryComponent
  },
  {
    path : 'statistics',
    component : StatisticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
