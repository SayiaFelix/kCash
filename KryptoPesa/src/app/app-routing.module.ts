import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KryptoPriceComponent } from './krypto-price/krypto-price.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  
  { path: '', redirectTo:"/homepage", pathMatch:"full"},
  
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'about-us',component:AboutusComponent},
  {path:'Krypto-Price',component:KryptoPriceComponent},

  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
