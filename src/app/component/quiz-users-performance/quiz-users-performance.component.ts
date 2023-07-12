import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-quiz-users-performance',
  templateUrl: './quiz-users-performance.component.html',
  styleUrls: ['./quiz-users-performance.component.css']
})
export class QuizUsersPerformanceComponent implements OnInit {

  quizId;
  quizMasterId;
  allStudentPerformances = [];

  isLoading = true;

  filteredStatus='';
  reverse:boolean = false;
  sortAllow;

  p:number =1;

  constructor(private route:ActivatedRoute,private assignedQuizService:QuizzesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.quizId = params['quizId'];      

      this.assignedQuizService.getAssignedQuizStudentsPerformances(+this.quizId).subscribe(res=>{
        res["results"].forEach(singleResult=>{
          if(singleResult.phone==undefined || singleResult.phone==null || singleResult.phone.toString()=="")
          {
            singleResult.phone = "NA";
          }

          if(singleResult.email==undefined || singleResult.email==null || singleResult.email.toString()=="")
          {
            singleResult.email = "NA";
          }

          singleResult.correctQues = singleResult.score;
          singleResult.score = singleResult.score+"/ "+singleResult.reviewSolutions.length;
        });
        res["results"].sort((a, b) => {
          return a.rank - b.rank;
        });
        this.allStudentPerformances = res["results"];
        console.log(this.allStudentPerformances);
        this.hideloader();
      })

    })
  }

  hideloader() {  
    console.log("Stop Loading");
    this.isLoading = false;
  }


}
