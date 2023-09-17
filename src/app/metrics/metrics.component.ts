import { Component, OnInit } from '@angular/core';
import { QuizzesService } from '../services/quizzes.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  allQuizMasterQuizes = [];
  quizMasterId;

  constructor(private quizzesService: QuizzesService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    this.getQuizzes(this.quizMasterId);
  }

  getQuizzes(quizMasterId) {
    this.quizzesService.getQuizzesByQuizMasterId(quizMasterId).subscribe(res => {
      this.allQuizMasterQuizes = res['quizzes'];
      console.log(this.allQuizMasterQuizes);
      this.spinnerService.hide();
    });
  }

}
