import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PaymentRequestsService } from 'src/app/services/payment-requests.service';

@Component({
  selector: 'app-all-payment-requests',
  templateUrl: './all-payment-requests.component.html',
  styleUrls: ['./all-payment-requests.component.css']
})
export class AllPaymentRequestsComponent implements OnInit,OnDestroy,AfterViewInit{

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allPaymentRequests = [];

  isDtInitialized:boolean = false;
  
  constructor(private paymentRequestService:PaymentRequestsService,private toastr: ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      order:this.allPaymentRequests
    };
    this.getAllPaymentRequests();
  }

  getAllPaymentRequests()
  {
    this.paymentRequestService.getAllPaymentRequests().subscribe(res=>{
      res["paymentRequests"].forEach(payReq=>{
        if(payReq.upiId.toString().length==0)
        {
          payReq.upiId = "NA";
        }
      });
      this.allPaymentRequests = res["paymentRequests"];
      console.log(this.allPaymentRequests);
      // this.dtTrigger.next();
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.spinnerService.hide();
          this.rerender();
        });
      } else {
        this.isDtInitialized = true
        this.spinnerService.hide();
      this.rerender();
      }
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
