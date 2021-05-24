import { Component, OnInit } from '@angular/core';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { SelectAgeGroupService } from 'src/app/services/select-age-group.service';

@Component({
  selector: 'app-quiz-questions-list',
  templateUrl: './quiz-questions-list.component.html',
  styleUrls: ['./quiz-questions-list.component.css']
})
export class QuizQuestionsListComponent implements OnInit {
  public data;
  questions = [];
  

  constructor(
    private selectAgeGroupService: SelectAgeGroupService,
    private quiMasterService: QuizMasterService
  ) {
    debugger;
    this.data = selectAgeGroupService.getOption();
   }

  ngOnInit(): void {
    console.log(this.data['selectCategory']);
    this.getQuestions();
  }

  getQuestions() {
    const postdata = {
      quizMasterId: "105",
      categoryName: this.data['selectCategory']
    }
    this.quiMasterService.getQuestions(postdata).subscribe(result => {
      debugger;
      this.questions = result['questions']
      console.log(result);
    })
  }

}
