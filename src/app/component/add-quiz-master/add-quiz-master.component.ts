import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-add-quiz-master',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizMasterComponent implements OnInit {

  addQuizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quizMasterService: QuizMasterService,
    private router: Router,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(
    ): void {

      this.addQuizForm = this.fb.group({
        name:['', Validators.required],
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
      if(res["status"])
      {        
        this.toastr.success(res["message"]);
        this.router.navigate(['/main-content']);
      }
      else{
        this.toastr.error(res["message"]);
      }

    });

  }
}
