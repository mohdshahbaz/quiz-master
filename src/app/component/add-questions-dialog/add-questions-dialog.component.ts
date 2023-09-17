import { Component, Inject, OnInit,AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-add-questions-dialog',
  templateUrl: './add-questions-dialog.component.html',
  styleUrls: ['./add-questions-dialog.component.css']
})
export class AddQuestionsDialogComponent implements OnInit {

  questions: any;
  quesAvail = false;

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allTransactions = [];

  isDtInitialized:boolean = false;

  constructor(private quizMasterService: QuizMasterService,
    private quizzesService: QuizzesService,
    public dialogRef: MatDialogRef<AddQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getQuestions();
    console.log("Selected Questions : ",this.data.selectedQuestionsId);
  }

  getQuestions() {
    const postData = {
      quizMasterId: JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'],
      categoryName: this.data.selectedCategory
    }

    this.quizzesService.getQuestions(postData).subscribe(result => {
      if(result['status']) {
        var allQuestions = [];
        result['questions'].forEach(ques=>{
          const index = this.data.selectedQuestionsId.findIndex(i=>i==ques.questionId);
          if(index!=-1)
          {
            allQuestions.push(ques);
          }

          if(ques.questionStatus==0)
          {
           allQuestions.push(ques);
          }
        });
        this.questions = allQuestions;
        console.log(this.questions);
        if(this.questions.length!=0)
        {
          this.quesAvail = true;
        }
      }
    });
  }

  onCheckboxChange(e) {
   
    if (e.checked) {
      this.data.selectedQuestionsId.push(e.source.value);
    } else {
       this.data.selectedQuestionsId = this.data.selectedQuestionsId.filter(x => x != e.source.value);
    }
  }

  toggleCheckbox(id) {
    return (this.data.selectedQuestionsId.indexOf(id) != -1) ? true : false;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
