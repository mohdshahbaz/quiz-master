import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-add-questions-dialog',
  templateUrl: './add-questions-dialog.component.html',
  styleUrls: ['./add-questions-dialog.component.css']
})
export class AddQuestionsDialogComponent implements OnInit {
  questions: any;

  constructor(private quizMasterService: QuizMasterService,
    private quizzesService: QuizzesService,
    public dialogRef: MatDialogRef<AddQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getQuestions();
    console.log(this.data.selectedQuestionsId);
  }

  getQuestions() {
    const postData = {
      quizMasterId: "105",
      categoryName: this.data.selectedCategory
    }

    this.quizzesService.getQuestions(postData).subscribe(result => {
      if(result['status']) {
        this.questions = result['questions'];
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
