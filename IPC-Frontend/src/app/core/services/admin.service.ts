import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/user';

  getCount(){
    return this.http.get(`${this.url}/getUserCount`);
  }
}
