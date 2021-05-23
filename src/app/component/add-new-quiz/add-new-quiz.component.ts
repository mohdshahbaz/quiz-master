import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {
  
  addNewQuizForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addNewQuizForm = this.fb.group({
      selectCategory: ['', Validators.required],
      selectSubCategory: ['', Validators.required],
      areaOfInterest: ['', Validators.required],
      startTime: ['', Validators.required],
      startDate: ['', Validators.required],
      endTime: ['', Validators.required],
      endDate: [''],
      totalSlots: ['', Validators.required],
      numberOfQns: ['', Validators.required],
      difficulty: ['', Validators.required],
      timePerQns: ['', Validators.required],
      prizePool: ['', Validators.required],
      entryAmount: ['', Validators.required],
      winningPrize: ['', Validators.required]
    }, 
    // {
    //   Validators: [this.dateLessThan('endDate', 'startDate')]
    //   }
    );
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
 }

 dateLessThan(from: string, to: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let f = group.controls[from];
    let t = group.controls[to];
    if (f.value > t.value) {
      return {
        dates: "Date from should be less than Date to"
      };
    }
    return {};
  }
 }
}
