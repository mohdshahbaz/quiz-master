import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';

@Component({
  selector: 'app-edit-public-question',
  templateUrl: './edit-public-question.component.html',
  styleUrls: ['./edit-public-question.component.css']
})
export class EditPublicQuestionComponent implements OnInit {

  questionId;
  quizMasterId;

  defaultOption = 0;
  options = [];

  mediaFile;

  allCategories = [];
  allSubCategories = [];
  allAreaOfInterest = [];

  defaultCategory = "";
  defaultSubCategory = "";
  defaultAOI = "";

  newFlag;

  singleQues:any;

  constructor(private requestCategoryService: RequestCategoryService,private toast:ToastrService,private publicQuestionsService:PublicQuestionsService,
              private routerBtn:Router, private spinner: NgxSpinnerService,private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];

    this.requestCategoryService.getAllSelectedRequests().subscribe(resCategories=>{
      this.allCategories = resCategories["allRequests"];
      console.log("All Categories : ", this.allCategories);
    });

    this.route.params.subscribe(Params=>{
      this.questionId = Params['questionId'];
      console.log("Question ID : ",this.questionId);
      this.publicQuestionsService.getSingleQuestionDetails(this.quizMasterId,this.questionId).subscribe(res=>{
        if(res["status"])
        {
          this.singleQues = res["question"];
          this.defaultCategory = res["question"].quizCategory;          
        }
        else{
          this.toast.error(res["message"],"Error",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      })
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

selectImage(event)
{
  const file = event.target.files[0];
  this.mediaFile = file;
  console.log("Media File : ",this.mediaFile);
  
  const formData = new FormData();   
  formData.append('questionImage',this.mediaFile);

  this.publicQuestionsService.addQuestionImage(formData).subscribe(res=>{
    if(res["status"])
    {
      this.singleQues.quesImgUrl = res["imageUrl"];      
    }      
    else{
    this.toast.error("Media File not uploaded successfully","Error",{
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right'
    })
    }
  },
  err=>{
    console.log(err);
    this.toast.error("Media File not uploaded successfully","Error",{
      timeOut:2500,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right'
    })
  });
 }

  editQuestion(form:NgForm)
  {
    this.spinner.show();
    
    var questionObj = {
      quizMasterId:this.quizMasterId,
      questionId:this.questionId,
      quesText:this.singleQues.quesText,
      options:this.singleQues.options,
      quesImgUrl:this.singleQues.quesImgUrl,
      solution:this.singleQues.solution,
      rightOption:this.singleQues.rightOption
    };
    console.log(questionObj);
    this.publicQuestionsService.editSingleQuestion(questionObj).subscribe(res=>{
      if(res["status"])
      {   
        this.toast.success(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        this.spinner.hide();
        this.routerBtn.navigate(['/all-master-questions']);
      }      
      else{
      this.toast.error(res["message"],"Error",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
      }
    })
  }

}
