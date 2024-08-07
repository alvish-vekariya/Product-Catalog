import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { DatatableComponent } from './datatable/datatable.component';
import { AgGridAngular } from 'ag-grid-angular'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    DatatableComponent
  ],
  imports: [
    CommonModule,
    AgGridAngular,
    RouterModule,
    ReactiveFormsModule
  ],
  exports :[
    NavbarComponent,
    DatatableComponent
  ]
})
export class SharedModule { }
