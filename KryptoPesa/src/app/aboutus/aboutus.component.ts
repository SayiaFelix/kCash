import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public contactForm!: FormGroup; 
  isSubmit =true;
  submittedMessage='';
  constructor(private fb:FormBuilder,
     private http:HttpClient,
      private router:Router,
      private toast: NgToastService
      ){ }

  ngOnInit(): void {
    this.contactForm= this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendMessage(value:any){
  console.log(value)
  
  this.isSubmit = true;
  this.submittedMessage ='Submitted Successfully';
  
  setTimeout(()=>{
    this.isSubmit = false;
  },5000);
  }


}
