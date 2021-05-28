import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { QuizzesService } from '../../services/quizzes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

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

  groupsData: groupsDataInterface[];

  displayedColumns: string[] = ['groupId', 'groupName', 'students'];
  dataSource: MatTableDataSource<groupsDataInterface>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(

    private quizzesService: QuizzesService
    ) { 
     this.getAllStudentGroups();
    }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getAllStudentGroups() {
    this.quizzesService.getAllStudentGroups().subscribe(result => {
      this.dataSource = new MatTableDataSource(result['allGroups']);
    })
  }

}
