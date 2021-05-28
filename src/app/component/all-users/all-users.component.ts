import { Component, OnInit } from '@angular/core';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users = [];

  constructor(
    private quizzesService: QuizzesService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.quizzesService.getAllUsers().subscribe(result => {
      if(result['status']) {
        this.users = result['users'];
      }
    })
  }

}
