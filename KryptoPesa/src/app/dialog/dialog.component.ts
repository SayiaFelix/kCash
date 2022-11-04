import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup
  actionBtn : string= "save"
  
    constructor
    (
      private formbuilder: FormBuilder,
      private toast : NgToastService,
      @Inject(MAT_DIALOG_DATA) public  editData: any,
      private api : ApiService,private dialogRef :MatDialogRef<DialogComponent>
      ) { }
  
    ngOnInit(): void {
    this.productForm= this.formbuilder.group({
      name: ['',Validators.required],
      category: ['',Validators.required],
      fresh: ['',Validators.required],
      price: ['',Validators.required],
      comment: ['',Validators.required],
      date: ['',Validators.required]
    })
  
  if(this.editData){
    this.actionBtn='update'
    this.productForm.controls['name'].setValue(this.editData.name);
    this.productForm.controls['category'].setValue(this.editData.category);
    this.productForm.controls['date'].setValue(this.editData.date);
    this.productForm.controls['fresh'].setValue(this.editData.fresh);
    this.productForm.controls['comment'].setValue(this.editData.comment);
    this.productForm.controls['price'].setValue(this.editData.price);
  }
  }
  
  addProduct(){
  if(!this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:(res)=>{
          this.toast.success({detail:'SUCCESS!!!',summary:"Product Added Successfully!!",duration:5000})
          // alert("!");
          this.productForm.reset();
          this.dialogRef.close('save');
    
        },error:()=>{
          this.toast.error({detail:'ERROR!!!',summary:"Error while adding the product!!",duration:5000})
          // alert("")
        }
      })
    
    }
  }else{
    this.updateProduct()
  }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
      next:(res)=>{
        this.toast.success({detail:'SUCCESS!!!',summary:"Product Updated Successfully!!",duration:5000})
        // alert("Product updated Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        this.toast.error({detail:'ERROR!!!',summary:"Error while updating the value!!",duration:5000})
       
      }
    })

  }

}
