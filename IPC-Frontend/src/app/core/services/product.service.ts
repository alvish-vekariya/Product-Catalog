import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  private url = 'http://localhost:3000/product'

  addProduct(data: FormData){
    return this.http.post(`${this.url}/addProduct`, data);
  }

  deleteProduct(id: string, image : string){
    return this.http.delete(`${this.url}/deleteProduct?id=${id}&imagename=${image}`);
  }

  editProduct(id: string, data : any, imagename: string){
    return this.http.put(`${this.url}/updateProduct?id=${id}&imagename=${imagename}`, data)
  }

  getProduct(id: string){
    return this.http.get(`${this.url}/getProduct?id=${id}`);
  }
  
  getAllProducts(queryParams : any){
    return this.http.get(`${this.url}/getAllProduct`, {params : queryParams});
  }

  search(search: string){
    return this.http.get(`${this.url}/search?search=${search}`);
  }

  getCategory(category : string){
    return this.http.get(`${this.url}/getCategory?category=${category}`);
  }

  getProductCount(){
    return this.http.get(`${this.url}/getProductCount`);
  }

}
