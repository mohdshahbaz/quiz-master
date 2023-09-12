import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectGroupDialogComponent } from '../select-group-dialog/select-group-dialog.component';

@Component({
  selector: 'app-add-organization-quiz',
  templateUrl: './add-organization-quiz.component.html',
  styleUrls: ['./add-organization-quiz.component.css']
})
export class AddOrganizationQuizComponent implements OnInit {

  addNewQuizForm: FormGroup;
  startAge: number = null;
  endAge: number = null;
  requestedCategory: string;
  selectedQuestionsId = [];
  selectedGroupsId = [];
  age = null;
  quizMasterId;

  allCategories = [];
  allSubCategories = [];
  allAreaOfInterest = [];

  defaultCategory
  defaultSubCategory;
  defaultAOI;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private requestCategoryService: RequestCategoryService,
    private toastr: ToastrService,
    private spinner:NgxSpinnerService,
    private routerBtn:Router,
    private quizzesService:QuizzesService,
    private publicQuestionService:PublicQuestionsService,
  ) {

  }

  ngOnInit(): void {

    //get all categories 
    this.requestCategoryService.getAllSelectedRequests().subscribe(resCategories=>{
      this.allCategories = resCategories["allRequests"];
      console.log("All Categories : ", this.allCategories);
    });
  
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.addNewQuizForm = this.fb.group({
      quizTitle: ['',Validators.required],
      quizCategory: ['', Validators.required],
      quizSubCategory: ['', Validators.required],
      areaOfInterest: ['', Validators.required],
      startTime: [''],
      startDate: [''],
      endTime: [''],
      endDate: [''],
      noOfQuestions: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      timePerQues: [''],
      price: ['',Validators.required],
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
  }

  onSelectedAreaOfInterest(value:string){
    //value -> 0:d or 1:science (that's why splitting)
    console.log("Selected AreaOfInterest is :",value.split(':')[1]);
    this.defaultAOI = value.split(':')[1].trim();
  }

  openSelectGroupDialog() {
    const dialogRef = this.dialog.open(SelectGroupDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        selectedGroupsId: this.selectedGroupsId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedGroupsId = result['selectedGroupsId'];
      console.log(this.selectedGroupsId);
    })
  }

  openRequestCategoryDialog() {
    debugger;
    const dialogRef = this.dialog.open(RequestCategoryDialogComponent, {
      width: '400px',
      data: {quizMasterId:this.quizMasterId,masterType:0}
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

  openAddQuestionsDialog() {
    const dialogRef = this.dialog.open(AddQuestionsDialogComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data: {
        selectedQuestionsId: this.selectedQuestionsId,
        selectedCategory: this.addNewQuizForm.controls['quizCategory'].value,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedQuestionsId = result['selectedQuestionsId'];
      console.log(this.selectedQuestionsId);
    })
  }

  addOrganizationQuiz() {

    this.spinner.show();

    let postData = this.addNewQuizForm.value;
    postData['prizePool'] = [{ "rankNo": 1, "prize": "1200" }, { "rankNo": 2, "prize": "900" }, { "rankNo": 3, "prize": "500" }];
    postData['questions'] = this.selectedQuestionsId;
    postData['age'] = this.age;
    postData['quizMasterId'] = +this.quizMasterId;
    postData['access'] = this.selectedGroupsId;

    if ((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.spinner.hide();
      this.toastr.error('Enter valid end date!')
    } else if (this.selectedGroupsId == null) {
      this.spinner.hide();
      this.toastr.error('Select group!');
    } else if (this.addNewQuizForm.get('noOfQuestions').value != this.selectedQuestionsId.length) {
      this.spinner.hide();
      this.toastr.error('Selected questions should be equal to no of questions entered!');
    } else {
      //Calculate startdate and end date
      //StartDate -> Date before current date
      var yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      var yesterdayYr = yesterdayDate.getFullYear().toString();
      var yesterdayMonth = (yesterdayDate.getMonth()+1).toString();
      if(yesterdayMonth.length==1){
        yesterdayMonth = "0"+yesterdayMonth;
      }
      var yesterdayDt = yesterdayDate.getDate().toString();
      this.addNewQuizForm.value.startDate = yesterdayYr+'-'+yesterdayMonth+'-'+yesterdayDt;
      this.addNewQuizForm.value.startTime = "11:00";
      // console.log("Date : "+yesterdayDate.getDate(), yesterdayDate.getMonth()+1, yesterdayDate.getFullYear()); 
      //EndDate -> Date after 2 year
      var futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 700);
      var futureDayYr = futureDate.getFullYear().toString();
      var futureDayMonth = (futureDate.getMonth()+1).toString();
      if(futureDayMonth.length==1){
        futureDayMonth = "0"+futureDayMonth;
      }
      var futuredayDt = futureDate.getDate().toString();
      this.addNewQuizForm.value.endDate = futureDayYr+'-'+futureDayMonth+'-'+futuredayDt;
      this.addNewQuizForm.value.endTime = "11:00";
      
      this.addNewQuizForm.value.timePerQues = 10;
      console.log(this.addNewQuizForm.value);

      this.quizzesService.createAssignedQuiz(this.addNewQuizForm.value).subscribe(res=>{
        if(res["status"])
        {
          this.publicQuestionService.changeQuestionsStatusToPublic({quizMasterId:this.quizMasterId,questionIDs:postData['questions']}).subscribe(quesRes=>{
          if(quesRes["status"])
          {
            this.spinner.hide();
            this.toastr.info(res["message"],"Success",{
              timeOut:2500,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right'
            });

          this.addNewQuizForm.reset();
          this.age = null;

          this.routerBtn.navigate(['/all-quizzes/'+this.quizMasterId]);
        }
        else{
          this.spinner.hide();
          this.toastr.error(quesRes["message"],"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      })
        }else{
          this.spinner.hide();
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
