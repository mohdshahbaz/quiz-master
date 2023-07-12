import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DisputeService } from 'src/app/services/dispute.service';
import { DisputeDetailsComponent } from '../dispute-details/dispute-details.component';

@Component({
  selector: 'app-all-disputes',
  templateUrl: './all-disputes.component.html',
  styleUrls: ['./all-disputes.component.css']
})
export class AllDisputesComponent implements OnInit {

  allDisputes = [];

  constructor(private disputeService:DisputeService,public matDialog:MatDialog) { }

  ngOnInit(): void {
    this.disputeService.getAllDisputes().subscribe(res=>{
      this.allDisputes = res["allReports"];
      console.log(this.allDisputes);
    })
  }

  showDisputeDetails(disputeDesc,disputeImage)
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = true;
    dialogConfig.id = 'dispute-details-component';
    dialogConfig.height = "400px";
    dialogConfig.width = "850px";
    //passing data
    dialogConfig.data = {disputeDesc:disputeDesc,disputeImage:disputeImage};
    
    const modalDialog = this.matDialog.open(DisputeDetailsComponent,dialogConfig);
    
  }

}
