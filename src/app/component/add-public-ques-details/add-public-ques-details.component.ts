import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestCategoryService } from 'src/app/services/request-category.service';

@Component({
  selector: 'app-add-public-ques-details',
  templateUrl: './add-public-ques-details.component.html',
  styleUrls: ['./add-public-ques-details.component.css']
})
export class AddPublicQuesDetailsComponent implements OnInit {
  
  allCategories = [];
  allSubCategories = [];
  allAreaOfInterest = [];

  defaultCategory = "";
  defaultSubCategory = "";
  defaultAOI = "";

  newFlag;

  constructor(private requestCategoryService: RequestCategoryService,private routerBtn:Router) { }

  ngOnInit(): void {
     //get all categories 
     this.requestCategoryService.getAllSelectedRequests().subscribe(resCategories=>{
      this.allCategories = resCategories["allRequests"];
      console.log("All Categories : ", this.allCategories);
    });

  }
  
  onSelectedCategory(value:string,flag?:any)
  {
    const arr = value.split(':');
    //value -> 0:d or 1:science (that's why splitting)
   console.log("Selected value is :",value.split(':')[1]);   
 
   if(this.defaultCategory!="" && this.allSubCategories.length!=0 )
   {
        console.log(this.allCategories);
        //  findIndex
        const index = this.allCategories.findIndex(f=>f.category.trim()==value.split(':')[1].trim());
        console.log(index,this.allSubCategories[index]);
        //now we will set the Subcategory based on above selected category
                                                      //0 or 1 etc
        this.allSubCategories = this.allCategories[index].subCategory;
      
        //Updating Area of interest also
        this.onSelectedSubCategory("0:"+this.defaultSubCategory);
   }
   else{
      console.log("ELSE PART");
         //now we will set the Subcategory based on above selected category
                                                //0 or 1 etc
        // if(this.defaultCategory=="")
        // {          
          this.allSubCategories = this.allCategories[value.split(':')[0]].subCategory;
        // }
        // else{
        //   const index = this.allCategories.findIndex(f=>f.category==this.defaultCategory);
        //   this.allSubCategories = this.allCategories[index].subCategory;
          console.log(this.allSubCategories)
        // }

      
        if(this.defaultSubCategory!=null || this.defaultSubCategory!="")
        {
          console.log(this.defaultSubCategory);
          this.onSelectedSubCategory("0:"+this.defaultSubCategory);

        }
        
        if((+flag)>0){
          this.newFlag = +flag;
          this.defaultSubCategory = this.allSubCategories[0].name;
          this.onSelectedSubCategory("0:"+this.defaultSubCategory);
        }
   }

  }

  onSelectedSubCategory(value:string)
  {
    //value -> 0:physics or 1:chemistry (that's why splitting)
    const arr = value.split(':');
    console.log("Selected SubCategory is :",value.split(':')[1]);   
    console.log(this.allSubCategories,arr);
    this.defaultSubCategory = value.split(':')[1].trim();
   
   //  findIndex
    const index = this.allSubCategories.findIndex(f=>f.name.trim()==arr[1].trim());
     console.log(index,this.allSubCategories[index]);
    //now we will set the AreaOfInterest based on above selected SubCategory
                                                  //0 or 1 
    if(this.allSubCategories[index]!=undefined)
    {
      this.allAreaOfInterest = this.allSubCategories[index].areaOfInterest;
      console.log(this.allSubCategories[index].areaOfInterest);      
    }
    else{
      this.allAreaOfInterest = this.allSubCategories[0].areaOfInterest;
    }

    console.log(this.allAreaOfInterest[0]);
    if((this.defaultAOI!=null||this.defaultAOI!="") && this.newFlag==0)
    {
      // this.allAreaOfInterest[0] = this.defaultAOI;
      
    this.onSelectedAreaOfInterest("0:"+ this.allAreaOfInterest[0]);
    }
    else{
      this.defaultAOI = this.allAreaOfInterest[0];      
    this.onSelectedAreaOfInterest("0:"+this.defaultAOI);
    }

  }


  onSelectedAreaOfInterest(value:string)
  {
    //value -> 0:d or 1:science (that's why splitting)
    console.log("Selected AreaOfInterest is :",value.split(':')[1]);   
    this.defaultAOI = value.split(':')[1].trim();
    // if(this.newFlag==0)
    // {
    //   this.defaultAOI = value.split(':')[1];
    // }
    // else{
    //   this.allAreaOfInterest[0];
    // }
  }

  addQuestion(form:NgForm)
  {
    // form.value.quizSubCategory = this.defaultSubCategory;
    // form.value.areaOfInterest = this.defaultAOI;
    if(form.value.quizSubCategory=="" || form.value.quizSubCategory==undefined)
    {
      form.value.quizSubCategory = this.defaultSubCategory;
    }
    console.log(form.value);
    if(form.value.areaOfInterest=="" || form.value.areaOfInterest==undefined)
    {      
      alert("No AOI");
      const index = this.allSubCategories.findIndex(i=>i.name==form.value.quizSubCategory);
      if(index!=-1)
      {
        form.value.areaOfInterest = this.allSubCategories[index].areaOfInterest[0];
        console.log("AOI :",form.value.areaOfInterest);
      }
      else{
        console.log("SubCategory : ", form.value.quizSubCategory);
      }
    }
    // alert(JSON.stringify(form.value));
    sessionStorage.setItem('questionDetails',JSON.stringify(form.value));
    this.routerBtn.navigate(['/add-single-question']);
  }

}
