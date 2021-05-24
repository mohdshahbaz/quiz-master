import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  startAge: number;
  endAge: number;
}

@Component({
  selector: 'app-select-age-dialog',
  templateUrl: './select-age-dialog.component.html',
  styleUrls: ['./select-age-dialog.component.css']
})
export class SelectAgeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectAgeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    debugger;
    this.dialogRef.close();
  }

}
