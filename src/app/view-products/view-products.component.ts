import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  products=[];
  currentUser;
  constructor(private adminService:AdminService,private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser=localStorage.getItem("username")
    this.adminService.getProducts().subscribe(
      res=>{
        this.products=res.message;
      },
      err=>{
        console.log("err in reading products ",err)
        console.log("Something went wrong in reading products")
      }
    )
  }
  onProductSelect(productObject){
    //console.log(productObject)
    let username=localStorage.getItem('username')
    let newUserProductObj={username,productObject}
    //console.log(newUserProductObj)
    this.userService.sendProductToUserCart(newUserProductObj).subscribe(
      res=>{
        alert(res.message)
        this.userService.updateDataObservable(res['latestcartObj']);
      },
      err=>{
        console.log("error in posting product to cart",err);
        alert("Something went wronng in adding prodcut to cart")
      }
    )
  }

}
