import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ShowProductsComponent } from './show-products/show-products.component';


@NgModule({
  declarations: [
    ShowProductsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  exports : [
    ShowProductsComponent
  ]
})
export class PagesModule { }
