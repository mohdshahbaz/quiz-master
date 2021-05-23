import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  addQuizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizMasterService: QuizMasterService,
    private router: Router
  ) { }

  ngOnInit(
    ): void {

      this.addQuizForm = this.fb.group({
        email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        password: ['', Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')],
        duration: ['', Validators.required],
        noOfQuiz: ['', Validators.required],
        quizMaster: ['', Validators.required]
      });
    }

    get addQuizFormControls(): any {
      return this.addQuizForm['controls'];
   }

   createQuizMaster() {
     debugger;
    const data = this.addQuizForm.value;

    this.quizMasterService.createQuizMaster(data).subscribe(res => {
    });

    this.router.navigate(['/main-content']);
  }
}
