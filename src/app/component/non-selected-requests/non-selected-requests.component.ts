import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';
import { RequestCategoryDialogComponent } from '../request-category-dialog/request-category-dialog.component';

@Component({
  selector: 'app-non-selected-requests',
  templateUrl: './non-selected-requests.component.html',
  styleUrls: ['./non-selected-requests.component.css']
})
export class NonSelectedRequestsComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  requests: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private dialog: MatDialog,
    private requestCategoryService: RequestCategoryService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
    };
    this.getAllNonSelectedRequests();
  }

  getAllNonSelectedRequests() {
    this.requestCategoryService.getAllNonSelectedRequests().subscribe(res => {
      this.requests = res['allRequests'];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  openRequestCategoryDialog() {
    const dialogRef = this.dialog.open(RequestCategoryDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.createCategory(res);
    })
  }

  createCategory(data) {
    const postData = {
      quizMasterId: "105",
      category: data.requestedCategory,
      subCategory: data.requestedSubCategory,
      areaOfInterest: data.areaOfInterest,
      masterType: 1,
      isSelected: 1
    }

    this.requestCategoryService.createNewRequest(postData).subscribe(res => {
      console.log(res);
      if(res['status']) {
        this.toastr.success('successfully added category!');
        this.router.navigate(['/selected-requests']);
      }
    });
  }

  addRequestedCategory(requestId) {
    console.log(requestId);
    this.requestCategoryService.addRequestedCategory(requestId).subscribe(res => {
      if(res['status']) {
        this.toastr.success('Successfully added Category!');
        this.router.navigate(['/selected-requests']);
      }
    })
  }

}
