import { Component } from '@angular/core';
import { CategoryService } from 'src/app/core/services/category.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  constructor(private prodService : ProductService, private ls: LocalstorageService, private categoryService: CategoryService){}

  queryParams : any = {}; 

  allCategories : any;
  role !: string;
  ngOnInit(){
    this.setAllProducts();
    this.role = this.ls.role;
    this.categoryService.getAllCategory().subscribe((data: any)=>{
      this.allCategories = data.data;
    })
  }

  allProducts : any;

  setAllProducts(){
    this.prodService.getAllProducts(this.queryParams).subscribe((data:any)=>{
      this.allProducts = data.data;
    })
  }

  search(e:any){
    this.queryParams.search = e.target.value;
    this.setAllProducts();
  }
  
  changeCategory(event: any){
    this.queryParams.filter = event.target.value;
    this.setAllProducts();
  }

}
