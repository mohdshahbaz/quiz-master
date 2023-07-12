import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-single-student-performance',
  templateUrl: './single-student-performance.component.html',
  styleUrls: ['./single-student-performance.component.css']
})
export class SingleStudentPerformanceComponent implements OnInit {

  userId;
  quizMasterId;
  allPerformances = [];

  isLoading = true;

  filteredStatus='';
  reverse:boolean = false;
  sortAllow;

  p:number =1;

  constructor(private route:ActivatedRoute,private assignedQuizService:QuizzesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.userId = params['userId'];      
      this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];

      this.assignedQuizService.getUserAssignedQuizzesPerformance(+this.userId,+this.quizMasterId).subscribe(res=>{
        res["results"].forEach(singleResult=>{
          singleResult.correctQues = singleResult.score;
          singleResult.wrongQues = singleResult.reviewSolutions.length - (+singleResult.score);
          singleResult.score = singleResult.score+"/ "+singleResult.reviewSolutions.length;
        });
        this.allPerformances = res["results"];
        console.log(this.allPerformances);
        this.hideloader();
      })

    })
  }

  hideloader() {  
    console.log("Stop Loading");
    this.isLoading = false;
  }

}
