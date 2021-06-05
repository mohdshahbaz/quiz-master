import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectGroupDialogComponent } from '../select-group-dialog/select-group-dialog.component';

@Component({
  selector: 'app-edit-assigned-quiz',
  templateUrl: './edit-assigned-quiz.component.html',
  styleUrls: ['./edit-assigned-quiz.component.css']
})
export class EditAssignedQuizComponent implements OnInit {

  addNewQuizForm: FormGroup;
  startAge;
  endAge;
  requestedCategory: string;
  selectedQuestionsId;
  selectedGroupsId;
  age;
  quizMasterId = "131";
  quizId;
  quiz;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private requestCategoryService: RequestCategoryService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    private datePipe: DatePipe
  ) {

  }

  async ngOnInit() {

    this.getQuizId();
    this.quiz = await this.quizzesService.getSingleAssignedQuiz(this.quizId).toPromise();
    this.quiz = this.quiz['organizationQuiz'];
    console.log(this.quiz);


    this.addNewQuizForm = this.fb.group({
      quizCategory: [this.quiz.quizCategory, Validators.required],
      quizSubCategory: [this.quiz.quizSubCategory, Validators.required],
      areaOfInterest: [this.quiz.areaOfInterest, Validators.required],
      startTime: [this.quiz.startTime, Validators.required],
      startDate: [this.datePipe.transform(this.quiz.startDate, "yyyy-MM-dd"), Validators.required],
      endTime: [this.quiz.endTime, Validators.required],
      endDate: [this.datePipe.transform(this.quiz.startDate, "yyyy-MM-dd"), Validators.required],
      noOfQuestions: [this.quiz.noOfQuestions, Validators.required],
      difficultyLevel: [this.quiz.difficultyLevel, Validators.required],
      timePerQues: [this.quiz.timePerQues, Validators.required],
    });
  }

  async getQuizId() {
    await this.activatedRoute.paramMap.subscribe(params => {
      this.quizId = params.get('quizId');
    })
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
  }

  openSelectGroupDialog() {
    const dialogRef = this.dialog.open(SelectGroupDialogComponent, {
      width: '100%',
      height: '100%',
      data: {
        selectedGroupsId: this.quiz.access
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quiz.access = result['selectedGroupsId'];
        console.log(this.quiz.access);
      }
    });
  }


  openAddQuestionsDialog() {
    const dialogRef = this.dialog.open(AddQuestionsDialogComponent, {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      data: {
        selectedQuestionsId: this.quiz.questions,
        selectedCategory: this.addNewQuizForm.controls['quizCategory'].value,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quiz.questions = result['selectedQuestionsId'];
        console.log(this.quiz.questions);
      }
    })
  }

  openRequestCategoryDialog() {
    debugger;
    const dialogRef = this.dialog.open(RequestCategoryDialogComponent, {
      width: '300px',
      data: { requestedCategory: this.requestedCategory }
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

  addNewQuiz() {
    let postData = this.addNewQuizForm.value;
    postData['prizePool'] = [{ "rankNo": 1, "prize": "1200" }, { "rankNo": 2, "prize": "900" }, { "rankNo": 3, "prize": "500" }];
    postData['questions'] = this.quiz.questions;
    postData['quizMasterId'] = 105;
    postData['quizTitle'] = "A new Science quiz";
    postData['access'] = this.quiz.access;
    debugger;

    if ((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.toastr.error('Enter valid end date!')
    } else if (this.quiz.access == null) {
      this.toastr.error('Select group!');
    } else if (this.addNewQuizForm.get('noOfQuestions').value != this.quiz.questions.length) {
      this.toastr.error('Selected questions should be equal to no of questions entered!');
    } else {
      console.log(this.addNewQuizForm.value);
      this.toastr.success('Quiz added succesfully!');
      this.addNewQuizForm.reset();
      this.age = null;
    }
  }

}
