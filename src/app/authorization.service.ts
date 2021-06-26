import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let token=localStorage.getItem("token");
    //if token is existed
    if(token){
      //add bearer token to header of req obj
      const clonedReqObj=req.clone({
        headers:req.headers.set("Authorization",`Bearer ${token}`)
      })
      //pass req obj to next interceptor or to API
      return next.handle(clonedReqObj);
    }else{
      //not existed
      return next.handle(req);
    }
    return;
  }
}
