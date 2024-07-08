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

  deleteProduct(id: string){
    return this.http.delete(`${this.url}/deleteProduct?id=${id}`);
  }

  editProduct(id: string, data : any){
    return this.http.put(`${this.url}/updateProduct?id=${id}`, data)
  }

  getProduct(id: string){
    return this.http.get(`${this.url}/getProduct?id=${id}`);
  }
  
  getAllProducts(){
    return this.http.get(`${this.url}/getAllProduct`);
  }

  search(search: string){
    return this.http.get(`${this.url}/search?search=${search}`);
  }

}
