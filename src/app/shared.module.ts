import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewProductsComponent } from './view-products/view-products.component';


@NgModule({
 imports:      [ CommonModule ],
 declarations: [  ViewProductsComponent],
 exports:      [ CommonModule, FormsModule ]
})
export class SharedModule { }