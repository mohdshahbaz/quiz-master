import { Component, OnInit } from '@angular/core';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users = [];
  public filter: any = '';
  query = '';

  constructor(
    private studentGroupService: StudentGroupService 
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.studentGroupService.getAllUsers().subscribe(result => {
      if(result['status']) {
        this.users = result['users'];
      }
    })
  }

}
