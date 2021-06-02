import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { AddQuestionsDialogComponent } from '../add-questions-dialog/add-questions-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectAgeDialogComponent } from '../select-age-dialog/select-age-dialog.component';
import { DatePipe } from '@angular/common';    

@Component({
  selector: 'app-edit-public-quiz',
  templateUrl: './edit-public-quiz.component.html',
  styleUrls: ['./edit-public-quiz.component.css']
})
export class EditPublicQuizComponent implements OnInit {

  addNewQuizForm: FormGroup;
  startAge;
  endAge;
  requestedCategory: string;
  selectedQuestionsId = [];
  age;
  quizMasterId = "105";
  quizId;
  quiz;
  startDate;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private requestCategoryService: RequestCategoryService,
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    private datePipe: DatePipe
  ) {
    
  }

  async ngOnInit() {

    this.getQuizId();
    
    this.quiz = await this.quizzesService.editPublicQuiz(this.quizId).toPromise();
    this.quiz = this.quiz['quiz'];

    this.age = {
      start: this.quiz.age.start,
      end: this.quiz.age.end
    }

    this.addNewQuizForm = this.fb.group({
      quizCategory: [this.quiz['quizCategory'], Validators.required],
      quizSubCategory: [this.quiz['quizSubCategory'], Validators.required],
      areaOfInterest: [this.quiz['areaOfInterest'], Validators.required],
      startTime: [this.quiz['startTime'], Validators.required],
      startDate: [this.datePipe.transform(this.quiz.startDate, "yyyy-MM-dd"), Validators.required],
      endTime: [this.quiz['endTime']],
      endDate: [this.datePipe.transform(this.quiz.endDate, "yyyy-MM-dd")],
      slots: [this.quiz['slots'], Validators.required],
      noOfQuestions: [this.quiz['noOfQuestions'], Validators.required],
      difficultyLevel: [this.quiz['difficultyLevel'], Validators.required],
      timePerQues: [this.quiz['timePerQues'], Validators.required],
      prizePool: [this.quiz['prizePool'], Validators.required],
      entryAmount: [this.quiz['entryAmount'], Validators.required],
      winningPrize: [this.quiz['winningPrize'], Validators.required],
    });

  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
  }

  async getQuizId() {
    await this.activatedRoute.paramMap.subscribe(params => {
      this.quizId = params.get('quizId');
    });
  }

  openSelectAgeDialog() {
    debugger;
    const dialogRef = this.dialog.open(SelectAgeDialogComponent, {
      width: '250px',
      data: { startAge: this.quiz.age.start, endAge: this.quiz.age.end }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.age = {
        start: result['startAge'],
        end: result['endAge']
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

  addNewQuiz() {
    let postData = this.addNewQuizForm.value;
    postData['prizePool'] = [{ "rankNo": 1, "prize": "1200" }, { "rankNo": 2, "prize": "900" }, { "rankNo": 3, "prize": "500" }];
    postData['questions'] = this.selectedQuestionsId;
    postData['age'] = this.age;
    postData['quizMasterId'] = 105;
    postData['quizTitle'] = "A new Science quiz";
    debugger;

    if ((Date.parse(postData['startDate'])) > (Date.parse(postData['endDate']))) {
      this.toastr.error('Enter valid end date!')
    } else if (this.age == null) {
      this.toastr.error('Enter correct age group!');
    } else if (this.addNewQuizForm.get('noOfQuestions').value != this.selectedQuestionsId.length) {
      this.toastr.error('Selected questions should be equal to no of questions entered!');
    } else {
      console.log(this.addNewQuizForm.value);
      this.toastr.success('Quiz added succesfully!');
      this.addNewQuizForm.reset();
      this.age = null;
    }
  }
}
