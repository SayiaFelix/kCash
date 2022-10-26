import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LoginForm!: FormGroup; 

  constructor(private fb:FormBuilder,
     private http:HttpClient,
      private router:Router,
      private toast: NgToastService
      ) { }
  
  login(){
    if(this.LoginForm.valid){
      // send obj to db
      console.log(this.LoginForm.value);
      this.http.get<any>("http://localhost:3000/users/")
      .subscribe(res=>{
        const user = res.find((a:any)=>{
  
        return a.email === this.LoginForm.value.email &&
         a.password === this.LoginForm.value.password
        });
        if(user){
          // alert('Login Successfully');
          this.toast.success({detail:'SUCCESS!!!!',summary:"Login Successfully!!",duration:5000})
          // this.toast.info({detail:'Welcome Message',summary:"Welcome to our Dashboard!!",duration:5000})
          this.LoginForm.reset();
          this.router.navigate(['dashboard']);
        }
        else{
          this.toast.error({detail:'FAILED!!!',summary:"Login Failed!!",duration:5000})
          // this.toast.warning({detail:'Warming Message',summary:"User Not Found,Use Correct Details!!",duration:5000})
          // alert('User not found')
        } 
      },
      err=>{
        alert('Something went Wrong ,Try again!!!!!')
      })
      
    }
    else{
      this.validateAllFormFields(this.LoginForm)
      alert('Form is invalid')
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
    ngOnInit(): void {
      this.LoginForm= this.fb.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
      });
    }

}
