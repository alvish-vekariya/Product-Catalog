import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagesModule } from '../pages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { DatatableActionsComponent } from './category/datatable-actions/datatable-actions.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ActionsComponent } from './statistics/actions/actions.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CategoryComponent,
    DatatableActionsComponent,
    StatisticsComponent,
    ActionsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
