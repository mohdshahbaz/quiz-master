import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectGroupDialogComponent } from '../select-group-dialog/select-group-dialog.component';

@Component({
  selector: 'app-edit-assigned-quiz',
  templateUrl: './edit-assigned-quiz.component.html',
  styleUrls: ['./edit-assigned-quiz.component.css']
})
export class EditAssignedQuizComponent implements OnInit {

  addNewQuizForm: FormGroup;
  startAge;
  endAge;
  requestedCategory: string;
  selectedQuestionsId;
  selectedGroupsId;
  age;
  quizMasterId;
  quizId;
  quiz;

  allCategories = [];
  allSubCategories = [];
  allAreaOfInterest = [];
  defaultCategory:any = "-1";
  defaultSubCategory:any = -1;
  defaultAOI:any = -1;
  newFlag: number;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private requestCategoryService: RequestCategoryService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    private datePipe: DatePipe,
    private routerBtn:Router
  ) {
    
     //get all categories 
     this.requestCategoryService.getAllSelectedRequests().subscribe(resCategories=>{
      this.allCategories = resCategories["allRequests"];
      console.log("All Categories : ", this.allCategories);
      
    });

  }

  async ngOnInit() {
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.getQuizId();
    this.quiz = await this.quizzesService.getSingleAssignedQuiz(this.quizId).toPromise();
    this.quiz = this.quiz['organizationQuiz'];
    console.log(this.quiz);
    this.defaultSubCategory = this.quiz.quizSubCategory.trim();
    this.defaultAOI = this.quiz.areaOfInterest.trim();
    this.defaultCategory = this.quiz.quizCategory.trim();
    console.log("Default Category : ",this.defaultCategory,this.defaultAOI);
    this.onSelectedCategory("0:"+this.defaultCategory);

    this.addNewQuizForm = this.fb.group({
      quizId: [this.quiz.quizId], 
      quizTitle: [this.quiz.quizTitle, Validators.required], 
      quizCategory: [this.quiz.quizCategory, Validators.required],
      quizSubCategory: [this.quiz.quizSubCategory.trim(), Validators.required],
      areaOfInterest: [this.quiz.areaOfInterest.trim(), Validators.required],
      startTime: [this.quiz.startTime, Validators.required],
      startDate: [this.datePipe.transform(this.quiz.startDate, "yyyy-MM-dd"), Validators.required],
      endTime: [this.quiz.endTime, Validators.required],
      endDate: [this.datePipe.transform(this.quiz.endDate, "yyyy-MM-dd"), Validators.required],
      noOfQuestions: [this.quiz.noOfQuestions, Validators.required],
      difficultyLevel: [this.quiz.difficultyLevel, Validators.required],
      timePerQues: [this.quiz.timePerQues, Validators.required],
    });
  }

  async getQuizId() {
    await this.activatedRoute.paramMap.subscribe(params => {
      this.quizId = params.get('quizId');
    })
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
  }

  onSelectedCategory(value:string,flag?:any)
  {
    const arr = value.split(':');
    //value -> 0:d or 1:science (that's why splitting)
   console.log("Selected value is :",value.split(':')[1]);  
  this.defaultCategory = value.split(':')[1].trim();
  console.log(this.defaultCategory);

   this.allCategories.forEach(cate=>{
     console.log(cate["category"]==this.defaultCategory,cate["category"],this.defaultCategory);
   })
   
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
    if(this.defaultCategory=="")
    {          
      const index = this.allCategories.findIndex(f=>f.category.trim()==value.split(':')[1].trim());
      // this.allSubCategories = this.allCategories[index].subCategory;
    }
    else{
      const index = this.allCategories.findIndex(f=>f.category==this.defaultCategory);
      if(this.allCategories[index]!=undefined)
      {
        this.allSubCategories = this.allCategories[index].subCategory;
        console.log(this.allSubCategories);
      }
    }
  
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

    if(this.defaultAOI==null||this.defaultAOI=="")
    {
      console.log(this.allAreaOfInterest[0]);
      this.defaultAOI = this.allAreaOfInterest[0];
      this.onSelectedAreaOfInterest("0:"+this.defaultAOI.trim());
      // this.onSelectedAreaOfInterest("0:"+ this.allAreaOfInterest[0]);
    }
    else{ 
      // this.defaultAOI = this.allAreaOfInterest[0];
      this.onSelectedAreaOfInterest("0:"+this.defaultAOI.trim());
    }

  }

  onSelectedAreaOfInterest(value:string)
  {
    //value -> 0:d or 1:science (that's why splitting)
    console.log("Selected AreaOfInterest is :",value.split(':')[1]);
    this.defaultAOI = value.split(':')[1].trim();
  }

  openSelectGroupDialog() {
    const dialogRef = this.dialog.open(SelectGroupDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        selectedGroupsId: this.quiz.access
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quiz.access = result['selectedGroupsId'];
        console.log(this.quiz.access);
      }
    });
  }

  openAddQuestionsDialog() {
    const dialogRef = this.dialog.open(AddQuestionsDialogComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data: {
        selectedQuestionsId: this.quiz.questions,
        selectedCategory: this.addNewQuizForm.controls['quizCategory'].value,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quiz.questions = result['selectedQuestionsId'];
        console.log(this.quiz.questions);
      }
    })
  }

  openRequestCategoryDialog() {
    debugger;
    const dialogRef = this.dialog.open(RequestCategoryDialogComponent, {
      width: '300px',
      data: { requestedCategory: this.requestedCategory }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.createCategory(result);
    })
  }

  createCategory(data) {
    const postData = {
      quizMasterId: this.quizMasterId,
      category: data.requestedCategory,
      subCategory: data.requestedSubCategory,
      areaOfInterest: data.areaOfInterest,
      masterType: 1,
      isSelected: 0
    }
    console.log(postData);
    this.requestCategoryService.createNewRequest(postData).subscribe(res => {
      console.log(res);
      if (res['status']) {
        this.toastr.success('successfully requested category!');
      }
    })
  }

  editAssignedQuiz() {
    let postData = this.addNewQuizForm.value;
    postData['prizePool'] = [{ "rankNo": 1, "prize": "1200" }, { "rankNo": 2, "prize": "900" }, { "rankNo": 3, "prize": "500" }];
    postData['questions'] = this.quiz.questions;
    postData['quizMasterId'] = +this.quizMasterId;
    postData['access'] = this.quiz.access;
    postData['quizCategory'] = this.defaultCategory;
    postData['quizSubCategory'] = this.defaultSubCategory;
    postData['areaOfInterest'] = this.defaultAOI;
    

    //startTime
    var startTimeCurr = postData['startTime'];
    var startTimeCurrArr = startTimeCurr.split(':');
    startTimeCurr = (+(startTimeCurrArr[0]*60))+(+startTimeCurrArr[1]);

    //endTime
    var endTimeCurr = postData['endTime'];
    var endTimeCurrArr = endTimeCurr.split(':');
    endTimeCurr = (+(endTimeCurrArr[0]*60))+(+endTimeCurrArr[1]);

    if((Date.parse(postData['startDate'])) == (Date.parse(postData['endDate'])) && (startTimeCurr>endTimeCurr))
    {
      console.log("Same Date",postData['startTime'],postData['endTime']);   
      this.toastr.error('Enter valid end time!'); 
    }
    else if((Date.parse(postData['startDate'])) == (Date.parse(postData['endDate'])) && (startTimeCurr==endTimeCurr))
    {
      this.toastr.error('Enter valid start and end time!'); 
    }
    else{


    if ((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.toastr.error('Enter valid end date!')
    } else if (this.quiz.access == null) {
      this.toastr.error('Select group!');
    } else if (this.addNewQuizForm.get('noOfQuestions').value != this.quiz.questions.length) {
      this.toastr.error('Selected questions should be equal to no of questions entered!');
    } else {
      console.log(this.addNewQuizForm.value);
     
      this.quizzesService.editAssignedQuiz(this.addNewQuizForm.value).subscribe(res=>{
        if(res["status"])
        {        
          this.toastr.info(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
          this.routerBtn.navigate(['/all-quizzes/'+this.quizMasterId]);
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

}
