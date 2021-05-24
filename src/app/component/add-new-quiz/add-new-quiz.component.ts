import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectAgeDialogComponent } from '../select-age-dialog/select-age-dialog.component';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';
import { SelectAgeGroupService } from '../../services/select-age-group.service';

@Component({
  selector: 'app-add-new-quiz',
  templateUrl: './add-new-quiz.component.html',
  styleUrls: ['./add-new-quiz.component.css']
})
export class AddNewQuizComponent implements OnInit {
  
  addNewQuizForm: FormGroup;
  startAge: number;
  endAge: number;
  requestedCategory: string;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private selectAgeGroupService: SelectAgeGroupService
  ) { 

  }

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
    console.log(this.addNewQuizForm.controls['selectCategory'].value);
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

openSelectAgeDialog() {
  debugger;
  const dialogRef = this.dialog.open(SelectAgeDialogComponent, {
    width: '250px',
    data: {starAge: this.startAge, endAge: this.endAge}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
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

  setSelectCategoryValue() {
    this.selectAgeGroupService.setOption('selectCategory', this.addNewQuizForm.controls['selectCategory'].value)
  }

}
