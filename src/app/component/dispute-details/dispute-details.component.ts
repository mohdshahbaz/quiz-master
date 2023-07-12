import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dispute-details',
  templateUrl: './dispute-details.component.html',
  styleUrls: ['./dispute-details.component.css']
})
export class DisputeDetailsComponent implements OnInit {

  disputeDesc;
  disputeImage;

  constructor(public dialogRef:MatDialogRef<DisputeDetailsComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.disputeDesc = data.disputeDesc;
    this.disputeImage = "https://quizeee-app-api.herokuapp.com/api/download/"+data.disputeImage;
  }

  ngOnInit(): void {
  }

  closeModel()
  {
    this.dialogRef.close();
  }

}
