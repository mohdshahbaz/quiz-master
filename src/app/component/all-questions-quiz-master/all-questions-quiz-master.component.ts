import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { PublicQuestionsService } from 'src/app/services/public-questions.service';
import { ShowQuestionDetailsComponent } from '../show-question-details/show-question-details.component';

@Component({
  selector: 'app-all-questions-quiz-master',
  templateUrl: './all-questions-quiz-master.component.html',
  styleUrls: ['./all-questions-quiz-master.component.css']
})
export class AllQuestionsQuizMasterComponent implements OnInit,OnDestroy {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allQuizMasterQuestions = [];
  
  quizMasterId;

  constructor(private publicQuestionsService:PublicQuestionsService,private toastr: ToastrService,
              private routerBtn:Router,private spinnerService:NgxSpinnerService,public matDialog:MatDialog)
  {
    
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      orderMulti:true,
      columnDefs:[ { type: 'date', 'targets': [this.allQuizMasterQuestions.length] } ],
      order:[[ this.allQuizMasterQuestions.length, 'desc' ]]
    };
    this.getAllQuizMasterQuestions(); 
    
  }

  getAllQuizMasterQuestions()
  {
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.publicQuestionsService.getAllQuizMasterQuestions(+this.quizMasterId).subscribe(res=>{
      this.allQuizMasterQuestions = res["questions"];
      this.spinnerService.hide();
      // this.dtTrigger.next();
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  deleteQuestion(quesId,quesStatus)
  {
    console.log(quesId,quesStatus);
    if((+quesStatus)!=0)
    {
      this.toastr.error("Question cannot be deleted(used in QUIZ)","",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
    else{
      this.publicQuestionsService.deleteSingleQuestion({quizMasterId:this.quizMasterId,questionId:quesId}).subscribe(res=>{
        if(res["status"])
        {
          this.toastr.info(res["message"],"Success",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
          this.ngOnInit();
        }
        else{
          this.toastr.error(res["message"],"Error Occured",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      })
    }
  }

  editQuestion(questionsId)
  {
    this.routerBtn.navigate(['/edit-single-question/'+questionsId]);
  }

  showQuestionDetails(questionsId)
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = false;
    dialogConfig.id = 'show-question-details-component';
    dialogConfig.height = "450px";
    dialogConfig.width = "850px";
    //passing data
    dialogConfig.data = {quizMasterId:this.quizMasterId,questionsId:questionsId};
    
    const modalDialog = this.matDialog.open(ShowQuestionDetailsComponent,dialogConfig);
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
