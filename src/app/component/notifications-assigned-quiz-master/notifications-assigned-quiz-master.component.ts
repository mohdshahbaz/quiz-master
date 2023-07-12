import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from 'src/app/services/notifications.service';
import { StudentGroupService } from 'src/app/services/student-group.service';

@Component({
  selector: 'app-notifications-assigned-quiz-master',
  templateUrl: './notifications-assigned-quiz-master.component.html',
  styleUrls: ['./notifications-assigned-quiz-master.component.css']
})
export class NotificationsAssignedQuizMasterComponent implements OnInit {

  allStudentsGroups = [];
  quizMasterId;

  constructor(private notificationsService:NotificationsService,private toastr: ToastrService,
            private studentGroupService:StudentGroupService,private spinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
    
    this.studentGroupService.getAllStudentGroups().subscribe(res=>{
      res["allGroups"] = res["allGroups"].filter(i=>i.quizMasterId == this.quizMasterId);
      this.allStudentsGroups = res["allGroups"];
      console.log(this.allStudentsGroups);
      this.spinnerService.hide();
    });
  }

  onSubmit(form:NgForm)
  {
    console.log(form.value);
    this.notificationsService.sendNotificationToSingleGroup({title:form.value.title,message:form.value.message,groupId:form.value.groupId}).subscribe(res=>{
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
