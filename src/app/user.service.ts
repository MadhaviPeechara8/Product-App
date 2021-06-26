import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userLoginStatus=false;

  //inject http client object
  constructor(private hc:HttpClient) {
    if(localStorage.getItem('username')!==null){
      this.userLoginStatus=true;
    }
   }

  createUser(userObj):Observable<any>{
    return  this.hc.post("/user/createuser",userObj)
  }

  loginUser(credentials):Observable<any>{
    return  this.hc.post("/user/login",credentials)
  }




  getUser(username):Observable<any>{
      return this.hc.get(`/user/getuser/${username}`)
  }

  deleteUser(){

  }

  updateUser(){

  }
  sendProductToUserCart(userProductObj):Observable<any>{
return this.hc.post("/user/add-to-cart",userProductObj)
  }
  getProductsFromUserCart(username):Observable<any>{
    return this.hc.get(`/user/getproducts/${username}`)
  }
}
