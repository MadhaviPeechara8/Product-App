import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {

  constructor(private userService:UserService) { }
userCartObj;
  ngOnInit(): void {
    let username=localStorage.getItem('username')
    this.userService.getProductsFromUserCart(username).subscribe(
      res=>{
        if(res["message"]==="Cart Empty"){
          alert("User cart is Empty")
        }else{
          //console.log(this.userCartObj)
          this.userCartObj=res["message"];
        }
      },
      err=>{
        console.log("err in reading cart",err)
        alert("Something went wrong in fetching cart items")
      }
    )
  }

}
