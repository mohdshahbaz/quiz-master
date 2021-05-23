import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  quizMasters:any = [];

  constructor(private quizMasterService: QuizMasterService,
        private router: Router
    ) { }

  ngOnInit(): void {
    this.getQuizMasters();
  }

  getQuizMasters() {
    this.quizMasterService.getAllQuizMasters().subscribe(res => {
      debugger;
      this.quizMasters = res['quizMasters'];
    })
  }

}
