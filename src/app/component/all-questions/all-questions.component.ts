import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PublicQuestionsService } from 'src/app/services/public-questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit,AfterViewInit {

  @ViewChild(DataTableDirective)
  
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allPublicQuestions = [];

  constructor(private publicQuestionsService:PublicQuestionsService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false
    };
    this.getAllPublicQuestions();
  }

  getAllPublicQuestions()
  {
    this.publicQuestionsService.getAllPublicQuestions().subscribe(res=>{
      this.allPublicQuestions = res["allPublicQuestions"];
      console.log(this.allPublicQuestions);
      // this.dtTrigger.next();
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  moveQuestionToPractice(quizMasterId, questionId)
  {
    this.publicQuestionsService.moveQuestionToPractice({quizMasterId:+quizMasterId,questionId:+questionId}).subscribe(res=>{
      if(res["status"])
      {
        this.toastr.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
         // this.getAllPublicQuestions();
         this.ngOnInit();
      }
      else{
        this.toastr.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
  }

  moveQuestionToPublic(quizMasterId, questionId)
  {
    this.publicQuestionsService.moveQuestionToPublic({quizMasterId:+quizMasterId,questionId:+questionId}).subscribe(res=>{
      if(res["status"])
      {
        this.toastr.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        // this.getAllPublicQuestions();
        this.ngOnInit();
      }
      else{
        this.toastr.error(res["message"],"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
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
