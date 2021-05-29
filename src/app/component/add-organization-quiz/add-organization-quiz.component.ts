import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SelectAgeGroupService } from 'src/app/services/select-age-group.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectAgeDialogComponent } from '../select-age-dialog/select-age-dialog.component';
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
  quizMasterId = "131";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private selectAgeGroupService: SelectAgeGroupService,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.addNewQuizForm = this.fb.group({
      quizCategory: ['', Validators.required],
      quizSubCategory: ['', Validators.required],
      areaOfInterest: ['', Validators.required],
      startTime: ['', Validators.required],
      startDate: ['', Validators.required],
      endTime: ['', Validators.required],
      endDate: ['', Validators.required],
      noOfQuestions: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      timePerQues: ['', Validators.required],
    });
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
 }

 openSelectGroupDialog() {
  const dialogRef = this.dialog.open(SelectGroupDialogComponent, {
    width: '100%',
    height: '100%',
    data: {selectedGroupsId: this.selectedGroupsId 
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
    width: '250px',
    data: {requestedCategory: this.requestedCategory}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
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

  setSelectCategoryValue() {
    this.selectAgeGroupService.setOption('selectCategory', this.addNewQuizForm.controls['quizCategory'].value)
  }

  addNewQuiz() {
    let postData = this.addNewQuizForm.value;
    postData['prizePool'] = [{"rankNo":1,"prize":"1200"},{"rankNo":2,"prize":"900"},{"rankNo":3,"prize":"500"}];
    postData['questions'] = this.selectedQuestionsId;
    postData['age'] = this.age;
    postData['quizMasterId'] = 105;
    postData['quizTitle'] = "A new Science quiz";
    postData['access'] = this.selectedGroupsId;
    debugger;

    if((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.toastr.error('Enter valid end date!')
    } else if(this.selectedGroupsId == null) {
      this.toastr.error('Select group!');
    } else if(this.addNewQuizForm.get('noOfQuestions').value != this.selectedQuestionsId.length) {
      this.toastr.error('Selected questions should be equal to no of questions entered!');
    } else {
      console.log(this.addNewQuizForm.value);
      this.toastr.success('Quiz added succesfully!');
      this.addNewQuizForm.reset();
      this.age = null;
    }
  }

}
