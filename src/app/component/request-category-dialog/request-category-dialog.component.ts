import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-category-dialog',
  templateUrl: './request-category-dialog.component.html',
  styleUrls: ['./request-category-dialog.component.css']
})
export class RequestCategoryDialogComponent implements OnInit {

  quizMasterId = 0;
  masterType;

  public categoryForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private routerBtn:Router,
    private requestCategoryService:RequestCategoryService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<RequestCategoryDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.quizMasterId = +data.quizMasterId;
    this.masterType = +data.masterType;

  }

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
  	 
  	  category:[''],
      subCategory: this._fb.array([this.initItemRows()])
    });
  }

  get formArr() {
    return <FormArray>this.categoryForm.get('subCategory');
  }

  initItemRows() {
    return this._fb.group({
    name:[''],
    areaOfInterest:['']
    });
  }
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit()
  {
    if(JSON.parse(localStorage.getItem('admin'))!=null)
    {
      console.log("Admin");
      const data = {
        quizMasterId : JSON.parse(localStorage.getItem('admin')).adminId,
        category:this.categoryForm.value.category,
        subCategory:this.categoryForm.value.subCategory,
        masterType : 2,  //for super-admin
        isSelected:1
      };
      console.log(data);
      
      this.requestCategoryService.createNewRequest(data).subscribe(res=>{
        if(res["status"])
        {
          this.toastr.info(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
  
          this.routerBtn.navigate(['/selected-requests/']);
  
        }else{
          this.toastr.error(res["message"],"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      });
  
    }
    else{
      console.log("Quiz Master")
      const data = {
        quizMasterId : this.quizMasterId,
        category:this.categoryForm.value.category,
        subCategory:this.categoryForm.value.subCategory,
        masterType : this.masterType, 
        isSelected:0
      };
      console.log(data);
      
      this.requestCategoryService.createNewRequest(data).subscribe(res=>{
        if(res["status"])
        {
          this.toastr.info(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
    
        }else{
          this.toastr.error(res["message"],"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      });
  
    }
   
  }

}
