import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QuizMasterService } from 'src/app/services/quiz-master.service';

@Component({
  selector: 'app-selected-requests',
  templateUrl: './selected-requests.component.html',
  styleUrls: ['./selected-requests.component.css']
})
export class SelectedRequestsComponent implements OnInit {

  dtOptions: DataTables.Settings = {}
  requests: any[] = []
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private quizMasterService: QuizMasterService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
    };
    this.getAllSelectedRequests();
  }

  getAllSelectedRequests() {
    this.quizMasterService.getAllSelectedRequests().subscribe(res => {
      this.requests = res['allRequests'];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
