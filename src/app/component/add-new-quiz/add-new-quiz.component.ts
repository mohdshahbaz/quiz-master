import { analyzeAndValidateNgModules, NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectAgeDialogComponent } from '../select-age-dialog/select-age-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectAgeGroupService } from '../../services/select-age-group.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { ToastrService } from 'ngx-toastr';

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

openSelectAgeDialog() {
  debugger;
  const dialogRef = this.dialog.open(SelectAgeDialogComponent, {
    width: '250px',
    data: {starAge: this.startAge, endAge: this.endAge}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.age = {
      startAge: result['startAge'],
      endAge: result['endAge']
    }
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
    data: {selectedQuestionsId: this.selectedQuestionsId, selectedCategory: this.addNewQuizForm.controls['quizCategory'].value}
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
    debugger;

    if((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.toastr.error('Enter valid end date!')
    } else if(this.age == null) {
      this.toastr.error('Enter correct age group!');
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
