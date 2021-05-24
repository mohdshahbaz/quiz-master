import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-category-dialog',
  templateUrl: './request-category-dialog.component.html',
  styleUrls: ['./request-category-dialog.component.css']
})
export class RequestCategoryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RequestCategoryDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
