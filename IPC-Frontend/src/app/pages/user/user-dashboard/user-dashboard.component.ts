import { Component } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {

  constructor(private prodService : ProductService, private ls: LocalstorageService){}

  role !: string;
  ngOnInit(){
    this.setAllProducts();
    this.role = this.ls.role;
  }

  allProducts : any;

  setAllProducts(){
    this.prodService.getAllProducts().subscribe((data:any)=>{
      this.allProducts = data.data
    })
  }

  search(e:any){
    this.prodService.search(e.target.value).subscribe((data: any)=>{
      this.allProducts = data.data;
    })
  }

}
