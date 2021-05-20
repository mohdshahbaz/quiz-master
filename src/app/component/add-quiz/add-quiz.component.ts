import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  addQuizForm: FormGroup;
  
  // addQuizForm = new FormGroup({
  //     emailId: new FormControl(),
  //     password: new FormControl(),
  //     duration: new FormControl(),
  //     noOfQuizes: new FormControl(),
  //     quizMasterCheckbox: new FormControl()
  // });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(
    ): void {

      this.addQuizForm = this.fb.group({
        name: ['', Validators.required],
        password: ['', [Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}'),
                    ]],
        emailId: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
        duration: ['', Validators.required],
        noOfQuizes: ['', Validators.required],
        quizMasterCheckbox: ['', Validators.required]
      });
    }

    get addQuizFormControls(): any {
      return this.addQuizForm['controls'];
   }
    
}
