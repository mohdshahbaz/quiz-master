import { Component, OnInit } from '@angular/core';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-show-all-users',
  templateUrl: './show-all-users.component.html',
  styleUrls: ['./show-all-users.component.css']
})
export class ShowAllUsersComponent implements OnInit {

  users = [];
  students = [];
  isLoading = true;

  filteredStatus='';
  reverse:boolean = false;
  sortAllow;

  p:number =1;

  constructor(
    private studentGroupService: StudentGroupService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.studentGroupService.getAllUsers().subscribe(result => {
      if (result['status']) {
        result['users'].forEach(user=>{
          if(user.email==null || user.email=="" || user.email=="null")
          {
            user.email = "NA";
          }

          if(user.phone==null || user.phone=="" || user.phone=="null")
          {
            user.phone = "NA";
          }

          if(user.profilePic==null)
          {
            user.profilePic = "";
          }
          else{
            user.profilePic = "https://quizeee-app-api.herokuapp.com/api/download/"+user.profilePic;
          }

          if(user.dateOfBirth==null)
          {
            user.dateOfBirth = '';
          }

        });
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

  addStudent(element, userId) {
    if (this.students.indexOf(userId) == -1) {
      this.students.push(userId);
      element.textContent = "User Added!";
    } else {
      this.students = this.students.filter(x => x != userId);
      element.textContent = "Add User";
    }
  }

  sort(colName)
  {    
    if(this.sortAllow)
    {
      this.users.sort((b, a) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        
    }
    else{
      this.users.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
    }
    this.sortAllow = !this.sortAllow;
  }

}
