import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { RequestCategoryService } from 'src/app/services/request-category.service';

@Component({
  selector: 'app-selected-requests',
  templateUrl: './selected-requests.component.html',
  styleUrls: ['./selected-requests.component.css']
})
export class SelectedRequestsComponent implements OnInit,OnDestroy,AfterViewInit {
  
  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {}
  requests: any[] = []
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private requestCategoryService: RequestCategoryService,
    private toast:ToastrService,
    private spinnerService:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5
    };
    this.getAllSelectedRequests();
  }

  getAllSelectedRequests() {
    this.requestCategoryService.getAllSelectedRequests().subscribe(res => {
      this.requests = res['allRequests'];
      console.log(this.requests[0].subCategory[0].areaOfInterest);
      this.spinnerService.hide();
      this.rerender();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  deleteSelectedRequest(requestId)
  {
    this.requestCategoryService.deleteRequestedCategory(+requestId).subscribe(res=>{
      if(res["status"])
      {
        this.toast.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });

        this.ngOnInit();

      }else{
        this.toast.error(res["message"],"Error Occured",{
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
