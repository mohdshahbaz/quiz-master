import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.css']
})
export class StudentPerformanceComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();
  quizMasterId;
  allStudents = [];

  showPerformance = true;

  constructor(
    private studentGroupService: StudentGroupService,
    private assignedQuizService: QuizzesService,
    private router: Router,
    private spinnerService:NgxSpinnerService
  ) { }

  ngOnInit(): void {    
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      columnDefs:[ { type: 'date', 'targets': [this.allStudents.length] } ],
      order:[[ this.allStudents.length, 'desc' ]]
    };
    this.getAllStudents();
  }

  getAllStudents() {
     var filteredStudents = [];
    this.studentGroupService.getAllUsers().subscribe(res => {      
     var totalCount = res['users'].length;
      this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
      res['users'].forEach((item, index, object) =>{
        // console.log(item.userId);

        if(item.phone==undefined || item.phone==null || item.phone.toString()=="")
        {
          item.phone = "NA";
        }

        if(item.email==undefined || item.email==null || item.email.toString()=="")
        {
          item.email = "NA";
        }

        this.assignedQuizService.getAllAssignedEnrollments(+item.userId,+this.quizMasterId).subscribe(resEnrollments=>{
          
          totalCount = totalCount - 1;
          item.totalEnrollments = resEnrollments["assignedQuizEnrollments"].length;
          
          if(resEnrollments["assignedQuizEnrollments"].length>0)
          {
            filteredStudents.push(item);
            // console.log(filteredStudents.length);
          }
          else{
            object.splice(index, 1);
          }

          // console.log(totalCount, res['users'].length);
          if(totalCount == 0)
          {
            console.log("Done");
            this.allStudents = filteredStudents;
            console.log(this.allStudents);      
            this.spinnerService.hide();
            // this.dtTrigger.next();      
            this.rerender();
          }
        });

      });
      // setTimeout(()=>{
        
      // // res['users'] =  res['users'].filter(i=>i.totalEnrollments > 0);
      // this.allStudents = res["users"];
      // // console.log(this.allStudents);      
      // this.spinnerService.hide();
      // // this.dtTrigger.next();      
      // this.rerender();
      // },2000);
     
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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
