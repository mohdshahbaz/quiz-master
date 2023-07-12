import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { StudentGroupService } from 'src/app/services/student-group.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewGroupStudentsComponent } from '../view-group-students/view-group-students.component';

export interface student {
  username: string
}

export interface groupsDataInterface{
  groupId: number,
  groupName: string,
  students: student[]
}

@Component({
  selector: 'app-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrls: ['./create-new-group.component.css']
})

export class CreateNewGroupComponent implements OnInit,OnDestroy,AfterViewInit  {
  
  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  groups: any[] = [];
  groupName;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
      private httpClient: HttpClient,
      private studentGroupService: StudentGroupService,
      private router: Router,
      private spinnerService:NgxSpinnerService,
      public matDialog:MatDialog
    ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    const quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.studentGroupService.getStudentGroupByQuizMasterId(quizMasterId)
    .subscribe(data => {
        this.groups = (data['allGroups'] as any);
        console.log(this.groups);
        this.spinnerService.hide();
        this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  navigateToAllUsers() {
    this.router.navigateByUrl('/all-users', { state: { groupName:  this.groupName}});
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  viewStudents(students)
  {
    // console.log(students);
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it will close
    dialogConfig.disableClose = false;
    dialogConfig.id = 'view-group-students-component';
    dialogConfig.height = "430px";
    dialogConfig.width = "860px";
    //passing data
    dialogConfig.data = {students:students};
    
    const modalDialog = this.matDialog.open(ViewGroupStudentsComponent,dialogConfig);
  }

}