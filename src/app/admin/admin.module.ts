import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from'@angular/forms'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from '../shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
