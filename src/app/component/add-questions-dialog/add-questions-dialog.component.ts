import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-add-questions-dialog',
  templateUrl: './add-questions-dialog.component.html',
  styleUrls: ['./add-questions-dialog.component.css']
})
export class AddQuestionsDialogComponent implements OnInit {
  questions: any;

  constructor(private quizMasterService: QuizMasterService,
    public dialogRef: MatDialogRef<AddQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getQuestions();
    this.data.selectedQuestionsId = [];
  }

  getQuestions() {
    const postData = {
      quizMasterId: "105",
      categoryName: this.data.selectedCategory
    }

    this.quizMasterService.getQuestions(postData).subscribe(result => {
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

  onCancelClick() {
    this.dialogRef.close();
  }

}
