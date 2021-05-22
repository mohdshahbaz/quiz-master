import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      endTime: [''],
      endDate: [''],
      totalSlots: ['', Validators.required],
      numberOfQns: ['', Validators.required],
      difficulty: ['', Validators.required],
      timePerQns: ['', Validators.required],
      prizePool: ['', Validators.required],
      entryAmount: ['', Validators.required],
      winningPrize: ['', Validators.required]
    });
  }

  get addNewQuizFormControls(): any {
    return this.addNewQuizForm['controls'];
 }
}
