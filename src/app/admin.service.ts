import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }
  addNewProduct(newProduct):Observable<any>{
return this.hc.post("/product/add-product",newProduct);
  }
  getProducts():Observable<any>{
return this.hc.get("/product/getproducts");
  }
}
