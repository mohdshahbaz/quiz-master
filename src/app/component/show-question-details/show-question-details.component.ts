import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-question-details',
  templateUrl: './show-question-details.component.html',
  styleUrls: ['./show-question-details.component.css']
})
export class ShowQuestionDetailsComponent implements OnInit {

  questionId;
  quizMasterId;

  singleQues;

  showHint = false;
  showRightAnswer = false;

  constructor(private toast:ToastrService,private publicQuestionsService:PublicQuestionsService,
    public dialogRef: MatDialogRef<ShowQuestionDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data)
  {
     this.quizMasterId = +data.quizMasterId;
     this.questionId = +data.questionsId;
  }

  ngOnInit(): void {
    this.publicQuestionsService.getSingleQuestionDetails(this.quizMasterId,this.questionId).subscribe(res=>{
      if(res["status"])
      {
        this.singleQues = res["question"];
      }
      else{
        this.toast.error(res["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
    
  }

  toggleHint()
  {
    this.showHint = !this.showHint;
    this.showRightAnswer = false;
  }

  toggleRightAnswer()
  {
    this.showRightAnswer = !this.showRightAnswer;
    this.showHint = false;
  }

}
