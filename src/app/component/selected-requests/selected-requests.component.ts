import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { RequestCategoryService } from 'src/app/services/request-category.service';

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
    private requestCategoryService: RequestCategoryService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
    };
    this.getAllSelectedRequests();
  }

  getAllSelectedRequests() {
    this.requestCategoryService.getAllSelectedRequests().subscribe(res => {
      this.requests = res['allRequests'];
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

}
