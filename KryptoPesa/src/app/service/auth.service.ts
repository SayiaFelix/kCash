import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(
     private http:HttpClient, 
     private fb:FormBuilder,
    private router:Router,
    private toast:NgToastService
    ) { }

  Register(){
    
  }
}
