import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';
import { Isignup } from '../interfaces/isignup';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/user'
  login(data: Ilogin){
    return this.http.post(`${this.url}/login`, data);
  }

  signup(data: Isignup){
    return this.http.post(`${this.url}/signup`, data);
  }

  logout(){
    return this.http.post(`${this.url}/logout`,{})
  }

}
