import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  start: number;
  end: number;
}

@Component({
  selector: 'app-select-age-dialog',
  templateUrl: './select-age-dialog.component.html',
  styleUrls: ['./select-age-dialog.component.css']
})
export class SelectAgeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectAgeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
       
      }

  ngOnInit(): void {
  }

  checkAgeNotEmpty()
  {
    if(this.data.start.toString().length == 0 || this.data.end.toString().length == 0 || +this.data.end<=(+this.data.start))
    {
      return true; //disable = true
    }
    else{
      return false
    }
  }

  onCancelClick(): void {
    // debugger;
    this.dialogRef.close();
  }

}
