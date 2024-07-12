import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getCount(){
    return this.http.get(`/user/getUserCount`);
  }

  getAllUser(){
    return this.http.get(`/user/getAllUsers`);
  }

  deleteUser(id: string){
    return this.http.delete(`/user/deleteUser?id=${id}`);
  }
}
