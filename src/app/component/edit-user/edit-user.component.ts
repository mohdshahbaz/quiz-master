import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userId;
  userDetails;

  constructor(private userService:StudentGroupService,private route:ActivatedRoute,private datePipe: DatePipe,
              private toast:ToastrService,private routerBtn:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.route.params.subscribe(Params=>{
      this.userId = Params['userId'];
      this.userService.getSingleUser(+this.userId).subscribe(res=>{      
        res["user"].dateOfBirth = this.datePipe.transform(res["user"].dateOfBirth,"yyyy-MM-dd");
        
        this.userDetails = res["user"];
        console.log(this.userDetails);
      });
    });
  }

  editUser(form:NgForm)
  {
    this.spinner.show();
    this.userDetails.dateOfBirth = this.userDetails.dateOfBirth+"T00:00:00.000"
    console.log(this.userDetails);
    this.userService.editUserDetailsAdmin(this.userDetails).subscribe(res=>{
      if(res["status"])
      {
        this.spinner.hide();
        this.toast.success(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        this.routerBtn.navigate(['/show-all-users']);
      }      
      else{
        this.spinner.hide();
        this.toast.error(res["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    });
  }

}
