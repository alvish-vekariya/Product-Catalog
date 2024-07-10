import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import {ColDef} from 'ag-grid-community';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  constructor(private adminService: AdminService, private productService: ProductService, private categoryService: CategoryService){};
  usersCount !: number;
  productsCount !: number;
  categoryCount !: number;
  rowData: any = [];

  colDefs: ColDef[] =[
    {field : 'username', flex: 1},
    {field: 'email', flex: 1},
    {field : 'createdAt', flex: 1, headerName:"Registered At"}
  ]


  ngOnInit(){
    this.adminService.getCount().subscribe((data: any)=>{
      this.usersCount = data.data
    })
    this.productService.getProductCount().subscribe((data:any)=>{
      this.productsCount = data.data;
    })
    this.categoryService.getCount().subscribe((data:any)=>{
      this.categoryCount = data.data;
    })
  }

  showUser(){
    this.adminService.getAllUser().subscribe((data: any)=>{
      this.rowData = data.data;
    })
  }


}
