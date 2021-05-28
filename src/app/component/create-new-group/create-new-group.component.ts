import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { StudentGroupService } from 'src/app/services/student-group.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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

export class CreateNewGroupComponent implements OnInit  {

  dtOptions: DataTables.Settings = {};
  groups: any[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient,
      private studentGroupService: StudentGroupService
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.studentGroupService.getAllStudentGroups()
      .subscribe(data => {
        this.groups = (data['allGroups'] as any);
        console.log(this.groups);
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
