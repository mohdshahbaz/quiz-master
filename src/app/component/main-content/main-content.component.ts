import { Component, OnInit } from '@angular/core';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  quizMasters:any = [];

  constructor(private quizMasterService: QuizMasterService) { }

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
