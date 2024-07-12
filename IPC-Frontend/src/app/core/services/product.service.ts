import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }


  addProduct(data: FormData){
    return this.http.post(`/product/addProduct`, data);
  }

  deleteProduct(id: string, image : string){
    return this.http.delete(`/product/deleteProduct?id=${id}&imagename=${image}`);
  }

  editProduct(id: string, data : any, imagename: string){
    return this.http.put(`/product/updateProduct?id=${id}&imagename=${imagename}`, data)
  }

  getProduct(id: string){
    return this.http.get(`/product/getProduct?id=${id}`);
  }
  
  getAllProducts(queryParams : any){
    return this.http.get(`/product/getAllProduct`, {params : queryParams});
  }

  search(search: string){
    return this.http.get(`/product/search?search=${search}`);
  }

  getCategory(category : string){
    return this.http.get(`/product/getCategory?category=${category}`);
  }

  getProductCount(){
    return this.http.get(`/product/getProductCount`);
  }

}
