import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/category';

  getAllCategory(){
    return this.http.get(`${this.url}/getAllCategory`);
  }

  getCategory(id:string){
    return this.http.get(`${this.url}/getCategory?id=${id}`);
  }

  addCategory(data: any){
    return this.http.post(`${this.url}/addCategory`, data);
  }

  deleteCategory(id:string){
    return this.http.delete(`${this.url}/deleteCategory?id=${id}`);
  }

  updateCategory(id:string, data: any){
    return this.http.put(`${this.url}/updateCategory?id=${id}`, data);
  }

  getCount(){
    return this.http.get(`${this.url}/getCategoryCount`);
  }
}
