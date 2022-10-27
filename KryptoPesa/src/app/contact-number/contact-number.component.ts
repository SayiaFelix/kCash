import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact-number',
  templateUrl: './contact-number.component.html',
  styleUrls: ['./contact-number.component.css']
})
export class ContactNumberComponent implements OnInit {

  public MobileForm!: FormGroup; 
  constructor
  (
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private toast:NgToastService
    ) { }

  ngOnInit(): void {
    this.MobileForm= this.fb.group({
      contact: ['', Validators.required],
     
  })
  }

  addContact(){
    if(this.MobileForm.valid){
      console.log(this.MobileForm.value);
      this.http.post<any>("http://localhost:3000/users/",this.MobileForm.value)
      .subscribe(res=>{
        this.toast.success({detail:'Success Message',summary:"Verification going on!!!",duration:5000})
        this.MobileForm.reset();
       this.router.navigate(['login']);
       },err=>{
        this.toast.error({detail:'Failed Message',summary:"Verification Failed, Something Went wrong!!",duration:5000})
     })
      // send obj to db
  
    }else{
      this.validateAllFormFields(this.MobileForm)
      alert('Form is  invalid')
    }
  
  }
  
  private validateAllFormFields(formGroup:FormGroup)
  {
  Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
  
    if( control instanceof FormControl){
      control.markAsDirty( {onlySelf: true});
    }
    else if( control instanceof FormGroup){
      this.validateAllFormFields(control);
    }
  })
    
  }

}
