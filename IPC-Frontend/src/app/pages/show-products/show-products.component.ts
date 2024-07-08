import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.scss']
})
export class ShowProductsComponent {

  @Input() allProducts :any;
  @Input() role!: string;
  
  @Output() deleteProduct = new EventEmitter<string>();
  @Output() updateProduct = new EventEmitter<string>();

  update(id: string){
    this.updateProduct.emit(id);
  }

  delete(id: string){
    this.deleteProduct.emit(id);
  }

  view(id: string){

  }

}
