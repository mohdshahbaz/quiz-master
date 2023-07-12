import { analyzeAndValidateNgModules, NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectAgeDialogComponent } from '../select-age-dialog/select-age-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectAgeGroupService } from '../../services/select-age-group.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { Router } from '@angular/router';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-add-new-quiz', 
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {
  
  addNewQuizForm: FormGroup;
  startAge: number = null;
  endAge: number = null;
  requestedCategory: string;
  selectedQuestionsId = [];
  age = null;
  quizMasterId;

  allCategories = [];
  allSubCategories = [];
  allAreaOfInterest = [];

  defaultCategory
  defaultSubCategory;
  defaultAOI;

  totalSlots;
  winningPrize;
  entryAmount;

  defaultWinningPercentage = 6;  
  prizePool = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private requestCategoryService: RequestCategoryService,
    private quizzesService:QuizzesService,
    private publicQuestionService:PublicQuestionsService,
    private routerBtn:Router,
    private spinnerService:NgxSpinnerService
  ) {

  }

  ngOnInit(): void {

    this.totalSlots =1 ;
    this.winningPrize = 1;
    this.entryAmount = 1;

    this.createPrizePool();

    //get all categories 
    this.requestCategoryService.getAllSelectedRequests().subscribe(resCategories=>{
      this.allCategories = resCategories["allRequests"];
      console.log("All Categories : ", this.allCategories);
    });

    // console.log("Quiz Master ID : ",JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'])
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.addNewQuizForm = this.fb.group({
      quizTitle: ['',Validators.required],
      quizCategory: ['', Validators.required],
      quizSubCategory: ['', Validators.required],
      areaOfInterest: ['', Validators.required],
      startTime: ['', Validators.required],
      startDate: ['', Validators.required],
      endTime: [''],
      endDate: [''],
      slots: ['', Validators.required],
      noOfQuestions: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      timePerQues: ['', Validators.required],
      prizePool: ['', Validators.required],
      entryAmount: ['', Validators.required],
      winningPrize: ['', Validators.required],
    });
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
 }

 onSelectedCategory(value:string){
  const arr = value.split(':');
   //value -> 0:d or 1:science (that's why splitting)
  console.log("Selected value is :",value.split(':')[1]);   
  this.defaultCategory = value.split(':')[1].trim();

  //now we will set the Subcategory based on above selected category
                                               //0 or 1 etc
  this.allSubCategories = this.allCategories[value.split(':')[0]].subCategory;

  //Updating Area of interest also
  this.onSelectedSubCategory("0:"+this.allSubCategories[0].name);
}

onSelectedSubCategory(value:string){
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
 this.allAreaOfInterest = this.allSubCategories[index].areaOfInterest;
 console.log(this.allSubCategories[index].areaOfInterest);
 this.defaultAOI = this.allAreaOfInterest[0];
// this.allSubCategories.forEach(f=>{
  
//   // console.log(f.name, value.split(':')[1]);
//   if(f.name.trim() == value.split(':')[1].trim())
//   {
//     console.log("SubCategory : ",f.name);
//   }
// })

}

onSelectedAreaOfInterest(value:string){
  //value -> 0:d or 1:science (that's why splitting)
 console.log("Selected AreaOfInterest is :",value.split(':')[1]);   
 this.defaultAOI = value.split(':')[1].trim();
}

openSelectAgeDialog() {
  if(localStorage.getItem("startAge"))
  {
    console.log(localStorage.getItem("startAge"));
    this.startAge = +localStorage.getItem("startAge");
    this.endAge = +localStorage.getItem("endAge");
    
  }
  const dialogRef = this.dialog.open(SelectAgeDialogComponent, {
    width: '250px',
    data: {start: this.startAge, end: this.endAge}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.age = {
      start: result['start'],
      end: result['end']
    }
    console.log(this.age);
    localStorage.setItem("startAge",this.age.start);
    localStorage.setItem("endAge",this.age.end);
    
  })
 
}

openRequestCategoryDialog() {
  debugger;
  const dialogRef = this.dialog.open(RequestCategoryDialogComponent, {
    width: '400px',
    data: {quizMasterId:this.quizMasterId,masterType:1}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    this.createCategory(result);
  })
}


onFeeChange(entryFee)
{
  // console.log(entryFee);
  this.winningPrize = 1;
  this.entryAmount = entryFee;
  this.winningPrize = this.winningPrize * this.entryAmount * this.totalSlots *0.9;
  console.log(this.winningPrize);
}

onTotalSlotsChange(totalSlots)
{
  // console.log(entryFee);
  this.winningPrize = 1;
  this.totalSlots = totalSlots;
  this.winningPrize = this.winningPrize * this.entryAmount * this.totalSlots *0.9;
  console.log(this.winningPrize);
}


createPrizePool()
{
  var d = 0.6;
  var A = this.winningPrize;
  var n = Math.floor(+this.totalSlots*0.6);
  console.log("N : ", n);
  for(var i = 1;i<=n;i++)
  {    
    var prize = ((1-d)/(1-(d**n)) * d**(i-1))*A;
    console.log(prize.toFixed(2), typeof prize);
    prize = +prize.toFixed(2);
    var prizeObj = {rankNo:i,prize:prize};
    this.prizePool.push(prizeObj);
  }
  console.log(this.prizePool);
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
    if(res['status']) {
      this.toastr.success('successfully requested category!');
    }
  })
}

openAddQuestionsDialog() {
  const dialogRef = this.dialog.open(AddQuestionsDialogComponent, {
    width: '100%',
    height: '100%',
    maxHeight: '100vh',
    maxWidth: '100vw',
    data: {selectedQuestionsId: this.selectedQuestionsId,
      selectedCategory: this.addNewQuizForm.controls['quizCategory'].value,
      }
  });

  dialogRef.afterClosed().subscribe(result => {
    this.selectedQuestionsId = result['selectedQuestionsId'];
    console.log(this.selectedQuestionsId);
  })
}

addNewQuiz() {
  this.spinnerService.show();

  let postData = this.addNewQuizForm.value;
  postData['quizCategory'] = this.defaultCategory;
  postData['quizSubCategory'] = this.defaultSubCategory;
  postData['areaOfInterest'] = this.defaultAOI;  

  postData['prizePool'] = [{"rankNo":1,"prize":"1200"},{"rankNo":2,"prize":"900"},{"rankNo":3,"prize":"500"}];
  postData['questions'] = this.selectedQuestionsId;
  postData['age'] = this.age;
  postData['quizMasterId'] = +this.quizMasterId;
  // postData['quizTitle'] = "A new Science quiz";
  this.createPrizePool();
  postData['prizePool'] = this.prizePool;

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
    this.spinnerService.hide();
     console.log("Same Date",postData['startTime'],postData['endTime']);   
     this.toastr.error('Enter valid end time!'); 
   }
   else if((Date.parse(postData['startDate'])) == (Date.parse(postData['endDate'])) && (startTimeCurr==endTimeCurr))
   {
    this.spinnerService.hide();
     this.toastr.error('Enter valid start and end time!'); 
   }
   else{

  if((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
    this.spinnerService.hide();
    this.toastr.error('Enter valid end date!');
  } else if(this.age == null) {
    this.spinnerService.hide();
    this.toastr.error('Enter correct age group!');
  } else if(this.addNewQuizForm.get('noOfQuestions').value != this.selectedQuestionsId.length) {
    this.spinnerService.hide();
    this.toastr.error('Selected questions should be equal to no of questions entered!');
  } else {
    console.log(this.addNewQuizForm.value);

    this.quizzesService.createPublicQuiz(this.addNewQuizForm.value).subscribe(res=>{
      if(res["status"])
      {
       this.publicQuestionService.changeQuestionsStatusToPublic({quizMasterId:this.quizMasterId,questionIDs:this.addNewQuizForm.value.questions}).subscribe(quesRes=>{
         if(quesRes["status"])
         {
          this.spinnerService.hide();

          this.toastr.info(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
  
          this.addNewQuizForm.reset();
          this.age = null;
          localStorage.removeItem('startAge');
          localStorage.removeItem('endAge');
            
          this.routerBtn.navigate(['/all-quizzes/'+this.quizMasterId]);
         }
         else{
          this.spinnerService.hide();
          this.toastr.error(quesRes["message"],"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
         }
       })

      }else{
        this.spinnerService.hide();
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
