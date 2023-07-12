import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-show-all-quizzes',
  templateUrl: './show-all-quizzes.component.html',
  styleUrls: ['./show-all-quizzes.component.css']
})
export class ShowAllQuizzesComponent implements OnInit,OnDestroy,AfterViewInit {
  
  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  quizMasterId;
  quizzes = [];

  showPerformance = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizzesService: QuizzesService,
    private toastr: ToastrService,
    private router: Router,
    private spinnerService:NgxSpinnerService
  ) { }

  ngOnInit(): void {    
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columnDefs:[ { type: 'date', 'targets': [this.quizzes.length] } ],
      order:[[ this.quizzes.length, 'desc' ]]
    };
    this.getQuizMasterId();
  }

  getQuizMasterId() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.quizMasterId = params.get('quizMasterId');
      this.getQuizzes(this.quizMasterId);
    });
  }

  getQuizzes(quizMasterId) {
    this.quizzesService.getQuizzesByQuizMasterId(quizMasterId).subscribe(res => {
      // res['quizzes'] = res['quizzes'].sort((a, b) => {
      //   return b.creationTimeStamp - a.creationTimeStamp;
      // });
      // console.log(res['quizzes']);

      if(res['quizzes'].length!=0)
      {
         // console.log(res['quizzes'][0]["type"]);
        if(res['quizzes'][0]["type"] != "assigned")
        {
          this.showPerformance = false;
        }  
      }
     
      this.quizzes = res['quizzes'];
      console.log(this.quizzes);      
      this.spinnerService.hide();
      // this.dtTrigger.next();      
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  openEditQuizPage(id, type) {
    if(type == 'assigned') {
      this.router.navigate(['/edit-assigned-quiz/' + id]);
    } else {
      this.router.navigate(['/edit-public-quiz/' + id]);
    }
  }

  showPerformances(quizId)
  {
    this.quizzesService.getAssignedQuizStudentsPerformances(+quizId).subscribe(res=>{
      if(res["status"])
      {
        this.router.navigate(['/quiz-users-performance/'+quizId]);
      }
      else{
        this.toastr.error(res["message"]);
      }
    });
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

}
