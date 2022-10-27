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
  public SignupForm!: FormGroup; 
  
  constructor(
     private http:HttpClient, 
     private fb:FormBuilder,
    private router:Router,
    private toast:NgToastService
    ) { }

  Signup(){
    if(this.SignupForm.valid){
      console.log(this.SignupForm.value);
      this.http.post<any>("http://localhost:3000/users/",this.SignupForm.value)
      .subscribe(res=>{
        this.toast.success({detail:'Success Message',summary:"Email Added Successfully!!",duration:5000})
        // alert('Signup successfully');
        this.SignupForm.reset();
       this.router.navigate(['sign']);
       },err=>{
        this.toast.error({detail:'Failed Message',summary:"Email Failed, Something Went wrong!!",duration:5000})
        // alert('something went wrong')
  
     })
      // send obj to db
  
    }else{
      ValidateForm.validateAllFormFields(this.SignupForm)
      alert('Your Form is Empty')
    }
  
  }
}
