import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { PaymentRequestsService } from 'src/app/services/payment-requests.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit {

  @ViewChild(DataTableDirective)

  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  allTransactions = [];

  isDtInitialized:boolean = false;
  
  constructor(private paymentRequestService:PaymentRequestsService,private toastr: ToastrService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      order:this.allTransactions
    };
    this.getallTransactions();
  }

  getallTransactions()
  {
    // this.paymentRequestService.getAllPaymentRequests().subscribe(res=>{
    //   res["paymentRequests"].forEach(payReq=>{
    //     if(payReq.upiId.toString().length==0)
    //     {
    //       payReq.upiId = "NA";
    //     }
    //   });
    //   this.allTransactions = res["paymentRequests"];
    //   console.log(this.allTransactions);
    //   // this.dtTrigger.next();
    //   if (this.isDtInitialized) {
    //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //       dtInstance.destroy();
    //       this.spinnerService.hide();
    //       this.rerender();
    //     });
    //   } else {
    //     this.isDtInitialized = true
        // this.spinnerService.hide();
    //   this.rerender();
    //   }
    // });
    this.allTransactions = [
      {
        paymentId: "PAY001",
        quizId: 101,
        userName: "Alice Johnson",
        price: 19.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-17T10:30:00Z"),
        email: "alice@example.com",
        phone: "+1 555-123-4567",
        quizTitle: "Math Quiz"
      },
      {
        paymentId: "PAY002",
        quizId: 102,
        userName: "Bob Smith",
        price: 29.99,
        paymentStatus: "Pending",
        transactionTimeStamp: new Date("2023-09-18T15:45:00Z"),
        email: "bob@example.com",
        phone: "+1 555-234-5678",
        quizTitle: "Science Quiz"
      },
      {
        paymentId: "PAY003",
        quizId: 103,
        userName: "Charlie Brown",
        price: 39.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-19T09:15:00Z"),
        email: "charlie@example.com",
        phone: "+1 555-345-6789",
        quizTitle: "History Quiz"
      },
      {
        paymentId: "PAY004",
        quizId: 104,
        userName: "David Wilson",
        price: 49.99,
        paymentStatus: "Pending",
        transactionTimeStamp: new Date("2023-09-20T14:30:00Z"),
        email: "david@example.com",
        phone: "+1 555-456-7890",
        quizTitle: "Geography Quiz"
      },
      {
        paymentId: "PAY005",
        quizId: 105,
        userName: "Eve Davis",
        price: 24.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-21T11:00:00Z"),
        email: "eve@example.com",
        phone: "+1 555-567-8901",
        quizTitle: "English Quiz"
      },
      {
        paymentId: "PAY006",
        quizId: 106,
        userName: "Frank Martin",
        price: 34.99,
        paymentStatus: "Pending",
        transactionTimeStamp: new Date("2023-09-22T12:45:00Z"),
        email: "frank@example.com",
        phone: "+1 555-678-9012",
        quizTitle: "Music Quiz"
      },
      {
        paymentId: "PAY007",
        quizId: 107,
        userName: "Grace Adams",
        price: 44.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-23T08:20:00Z"),
        email: "grace@example.com",
        phone: "+1 555-789-0123",
        quizTitle: "Art Quiz"
      },
      {
        paymentId: "PAY008",
        quizId: 108,
        userName: "Hank Lee",
        price: 54.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-24T17:30:00Z"),
        email: "hank@example.com",
        phone: "+1 555-890-1234",
        quizTitle: "Sports Quiz"
      },
      {
        paymentId: "PAY009",
        quizId: 109,
        userName: "Ivy Hernandez",
        price: 14.99,
        paymentStatus: "Pending",
        transactionTimeStamp: new Date("2023-09-25T13:10:00Z"),
        email: "ivy@example.com",
        phone: "+1 555-901-2345",
        quizTitle: "Technology Quiz"
      },
      {
        paymentId: "PAY010",
        quizId: 110,
        userName: "Jackie Ramirez",
        price: 64.99,
        paymentStatus: "Paid",
        transactionTimeStamp: new Date("2023-09-26T16:00:00Z"),
        email: "jackie@example.com",
        phone: "+1 555-012-3456",
        quizTitle: "Language Quiz"
      }
    ];    
    this.spinnerService.hide();
    
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
