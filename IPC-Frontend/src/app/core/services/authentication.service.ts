import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  
  login(data: Ilogin){
    return this.http.post(`/user/login`, data);
  }

  signup(data: FormData){
    return this.http.post(`/user/signup`, data);
  }

  logout(){
    return this.http.post(`/user/logout`,{});
  }

  getUser(){
    return this.http.get(`/user/getUser`);
  }

  updateUser(data: FormData, profile: string){
    return this.http.put(`/user/updateProfile?profile=${profile}`, data);
  }

  getOtp(email: string){
    return this.http.post(`/user/getOtp?email=${email}`,{});
  }
  
  validateOtp(email: string, otp: string){
    return this.http.post(`/user/verifyOtp?email=${email}&otp=${otp}`,{});
  }

  changePassword(email : string, newPswd : string){
    return this.http.put('/user/changePassword', {email : email, pswd : newPswd});
  }
}
