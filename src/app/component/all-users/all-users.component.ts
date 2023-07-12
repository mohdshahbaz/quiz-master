import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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

  isLoading = true;

  constructor(
    private studentGroupService: StudentGroupService,
    private toastr: ToastrService,
    private router: Router,
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.groupName = history.state.groupName;
  }

  getAllUsers() {
    this.studentGroupService.getAllUsers().subscribe(result => {
      if (result['status']) {
        result['users'].forEach(user=>{
          if(user.email=="" || user.email==null || user.email=="null")
          {
            user.email = "NA";
          }

          if(user.phone==null || user.phone=="" || user.phone=="null")
          {
            user.phone = "NA";
          }

        })
        this.users = result['users'];
        console.log(this.users);
        this.hideloader();
      }
    })
  }

  hideloader() {  
    console.log("Stop Loading");
    this.isLoading = false;
  }

  addStudent(element, user) {

    const index = this.students.findIndex(i=>i.userId==(+user.userId));
    console.log(this.students);
    if (index == -1) {
      this.students.push(user);
      element.textContent = "Remove User";
      this.query = '';
      console.log(this.students);
      sessionStorage.setItem('students',JSON.stringify(this.students));
    } else {
      this.students = this.students.filter(x => x.userId != user.userId);
      element.textContent = "Add User";
      sessionStorage.setItem('students',JSON.stringify(this.students));
    }
  }

  submitGroup() {

    this.spinner.show();

    var myStudents = [];
    this.students.forEach(singleStudent=>{
      myStudents.push(+singleStudent.userId);
    });

    const postData = {
      quizMasterId: +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'],
      groupName: this.groupName,
      students: myStudents
    }

    console.log(postData);

    if (this.students.length < 1) {
      this.spinner.hide();
      return this.toastr.error('Add users!');
    }
    this.studentGroupService.createStudentsGroup(postData).subscribe(res => {

      if (res['status']) {
        this.spinner.hide();
        this.toastr.success('Successfully created group!');
        this.router.navigate(['/create-new-group']);
        sessionStorage.removeItem('students');
      }
      else{
        this.spinner.hide();
        this.toastr.error(res["message"]);
      }
    },err=>{
      this.spinner.hide();
      this.toastr.error(JSON.stringify(err));
    });
  }

}
