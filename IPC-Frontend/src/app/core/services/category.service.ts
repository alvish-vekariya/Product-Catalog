import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000';

  getAllCategory(){
    return this.http.get(`/category/getAllCategory`);
  }

  getCategory(id:string){
    return this.http.get(`/category/getCategory?id=${id}`);
  }

  addCategory(data: any){
    return this.http.post(`/category/addCategory`, data);
  }

  deleteCategory(id:string){
    return this.http.delete(`/category/deleteCategory?id=${id}`);
  }

  updateCategory(id:string, data: any){
    return this.http.put(`/category/updateCategory?id=${id}`, data);
  }

  getCount(){
    return this.http.get(`/category/getCategoryCount`);
  }
}
