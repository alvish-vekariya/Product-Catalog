import { Component } from '@angular/core';
import { AdminService } from 'src/app/core/services/admin.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import {ColDef} from 'ag-grid-community';
import { ActionsComponent } from './actions/actions.component';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  constructor(private adminService: AdminService, private productService: ProductService, private categoryService: CategoryService, private ts: ToastService){};
  usersCount !: number;
  productsCount !: number;
  categoryCount !: number;
  rowData: any = [];

  colDefs: ColDef[] =[
    {field : 'username', flex: 1},
    {field: 'email', flex: 1},
    {field : 'createdAt', flex: 1, headerName:"Registered At"},
    {field : 'Delete', cellRenderer: ActionsComponent, flex:1, cellRendererParams : {
      deleteUser : (id: string)=>this.deleteUser(id as string)
    }}
  ]

  deleteUser(id: string){
    this.adminService.deleteUser(id).subscribe((data: any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.showUser();
        this.getUserCount();
      }else{
        this.ts.error(data.message);
      }
    })
  }

  getUserCount(){
    this.adminService.getCount().subscribe((data: any)=>{
      this.usersCount = data.data
    })
  }

  getProductCount(){
    this.productService.getProductCount().subscribe((data:any)=>{
      this.productsCount = data.data;
    })
  }

  getcategoryCount(){
    this.categoryService.getCount().subscribe((data:any)=>{
      this.categoryCount = data.data;
    })
  }


  ngOnInit(){
    this.getUserCount();
    this.getProductCount();
    this.getcategoryCount();
  }

  showUser(){
    this.adminService.getAllUser().subscribe((data: any)=>{
      this.rowData = data.data;
    })
  }


}
