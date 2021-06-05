import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { StudentGroupService } from 'src/app/services/student-group.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';

@Component({
  selector: 'app-select-group-dialog',
  templateUrl: './select-group-dialog.component.html',
  styleUrls: ['./select-group-dialog.component.css']
})
export class SelectGroupDialogComponent implements OnInit {

  groups;

  constructor(
    private studentGroupService: StudentGroupService,
    private quizzesService: QuizzesService,
    public dialogRef: MatDialogRef<AddQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  ngOnInit(): void {
    this.getGroups();
    console.log('selected gorups id: ' + this.data.selectedGroupsId);
  }

  getGroups() {
    const quizMasterId = 131;
    this.studentGroupService.getStudentGroupByQuizMasterId(quizMasterId).subscribe(result => {
      if(result['status']) {
        this.groups = result['allGroups'];
        console.log(this.groups);
      }
    });
  }

  onCheckboxChange(e) {
    if (e.checked) {
      this.data.selectedGroupsId.push(e.source.value);
    } else {
       this.data.selectedGroupsId = this.data.selectedGroupsId.filter(x => x != e.source.value);
    }
  }

  toggleCheckbox(id) {
    return (this.data.selectedGroupsId.indexOf(id) != -1) ? true : false;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
