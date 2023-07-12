import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-show-quiz-master-details',
  templateUrl: './show-quiz-master-details.component.html',
  styleUrls: ['./show-quiz-master-details.component.css']
})
export class ShowQuizMasterDetailsComponent implements OnInit {

  quizMasterId;
  quizMasterDetails;

  constructor(private route:ActivatedRoute,private quizMasterService:QuizMasterService) { }

  ngOnInit(): void {
    this.route.params.subscribe(Params=>{
      this.quizMasterId = Params['quizMasterId'];

      this.quizMasterService.getParticularQuizMaster(this.quizMasterId).subscribe(res=>{
        this.quizMasterDetails = res['quizMaster'];
        console.log(this.quizMasterDetails);
      });
    });
  }

}
