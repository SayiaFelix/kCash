import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/validateForm';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css']
})
export class Signup2Component implements OnInit {

  public SignForm!: FormGroup; 
  constructor
  (
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private toast:NgToastService
    ) { }

  ngOnInit(): void {
    this.SignForm= this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],    
  })
  }

  Sign(){
    if(this.SignForm.valid){
      console.log(this.SignForm.value);
      this.http.post<any>("http://localhost:3000/users/",this.SignForm.value)
      .subscribe(res=>{
        this.toast.success({detail:'Success Message',summary:"Name Registered Successfully!!",duration:5000})
        this.SignForm.reset();
       this.router.navigate(['addContact']);
       },err=>{
        this.toast.error({detail:'Failed Message',summary:"Name Registration Failed, Something Went wrong!!",duration:5000})
     })
      // send obj to db
  
    }else{
      ValidateForm.validateAllFormFields(this.SignForm)
      alert('Your Form is Empty')
    }
  
  }

}
