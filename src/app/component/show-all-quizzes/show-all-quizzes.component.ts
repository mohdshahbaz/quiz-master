import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-show-all-quizzes',
  templateUrl: './show-all-quizzes.component.html',
  styleUrls: ['./show-all-quizzes.component.css']
})
export class ShowAllQuizzesComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  quizMasterId;
  quizzes = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setDtOptions();
    this.getQuizMasterId();
  }

  setDtOptions() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  getQuizMasterId() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.quizMasterId = params.get('quizMasterId');
      this.getQuizzes(this.quizMasterId);
    });
  }

  getQuizzes(quizMasterId) {
    this.quizzesService.getQuizzesByQuizMasterId(quizMasterId).subscribe(res => {
      this.quizzes = res['quizzes'];
      console.log(this.quizzes);
      this.dtTrigger.next();
    });
  }

  openEditQuizPage(id, type) {
    if(type == 'assigned') {
      this.router.navigate(['/edit-assigned-quiz/' + id]);
    } else {
      this.router.navigate(['/edit-public-quiz/' + id]);
    }
  }

}
