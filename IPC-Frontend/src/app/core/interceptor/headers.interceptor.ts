import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../services/localstorage.service';
import { Router } from '@angular/router';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private ls: LocalstorageService, private router : Router) {}

  BASE_URL = 'http://localhost:3000'

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const urlRequest = request.clone({
      url : this.BASE_URL + request.url
    })
    request = urlRequest;
    if(this.ls.local){
      if(this.ls.token){
        const modifiedRequest = request.clone({
          setHeaders : {
            authorization : `Bearer ${this.ls.token}`
          }
        })
        return next.handle(modifiedRequest);
      }
    }
    return next.handle(request);
  }
}
