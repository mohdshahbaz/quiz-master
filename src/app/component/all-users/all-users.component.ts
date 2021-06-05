import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  groupName;
  students = [];

  constructor(
    private studentGroupService: StudentGroupService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.groupName = history.state.groupName;
  }

  getAllUsers() {
    this.studentGroupService.getAllUsers().subscribe(result => {
      if (result['status']) {
        this.users = result['users'];
      }
    })
  }

  addStudent(element, userId) {
    if (this.students.indexOf(userId) == -1) {
      this.students.push(userId);
      element.textContent = "User Added!";
    } else {
      this.students = this.students.filter(x => x != userId);
      element.textContent = "Add User";
    }
  }

  submitGroup() {
    const postData = {
      quizMasterId: "131",
      groupName: this.groupName,
      students: this.students
    }

    console.log(postData);

    if (this.students.length < 1) {
      return this.toastr.error('Add users!');
    }
    this.studentGroupService.createStudentsGroup(postData).subscribe(res => {

      if (res['status']) {
        this.toastr.success('Successfully created group!');
        this.router.navigate(['/create-new-group']);
      }
    });
  }

}
