import { HttpClient, HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userObj;
  constructor(private hc:HttpClient) { }

  ngOnInit(): void {
    //get user data from localstorage
    this.userObj=JSON.parse(localStorage.getItem("userObj"))
  }
  getPrivateData(){
this.hc.get('/user/testing').subscribe(
  res=>{
    alert(res['message'])
  },
  err=>{
    console.log(err)
    alert(err.message)
  }
)
  }
}
