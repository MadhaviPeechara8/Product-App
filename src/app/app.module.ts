import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from'@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthorizationService } from './authorization.service';
import { SharedModule } from './shared.module';
import { UsercartComponent } from './usercart/usercart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserprofileComponent,
    UsercartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,SharedModule
  ],
  providers: [
   {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
