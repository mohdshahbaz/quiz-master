import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications-super-admin',
  templateUrl: './notifications-super-admin.component.html',
  styleUrls: ['./notifications-super-admin.component.css']
})
export class NotificationsSuperAdminComponent implements OnInit {

  constructor(private notificationsService:NotificationsService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
    this.notificationsService.sendNotificationToAllUsers({title:form.value.title,message:form.value.message}).subscribe(res=>{
      if(res["status"])
      {
        this.toastr.info(res["message"],"Success",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        form.reset();
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

}
