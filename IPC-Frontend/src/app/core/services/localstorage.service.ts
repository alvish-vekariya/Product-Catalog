import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  get local(){
    return localStorage.getItem('user')
  }

  get user(){
    return JSON.parse(localStorage.getItem('user') as string);
  }

  get role(){
    return JSON.parse(localStorage.getItem('user') as string).role;
  }
  
  get username(){
    return JSON.parse(localStorage.getItem('user') as string).username;
  }

  get token(){
    return JSON.parse(localStorage.getItem('user') as string).token;
  }
}
