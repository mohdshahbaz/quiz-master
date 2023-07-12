import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userId;
  userDetails:any = {
    name:'',
    email:'',
    password:''
  };
  showPassword: boolean;

  constructor(private quizMasterService:QuizMasterService,private adminService:AdminService,public authService:AuthService,
              private toast:ToastrService,public dialogRef:MatDialogRef<EditProfileComponent>, 
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.userId = data.userId;
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.showPassword = false;
    if(localStorage.getItem('quizMaster')!=null)
    {
      console.log("Quiz Master logged in");
      const authUserInfo = localStorage.getItem('quizMaster');
      console.log("Profile:",JSON.parse(authUserInfo).quizMasterId);
      this.userDetails = JSON.parse(authUserInfo);
      console.log(this.userDetails);
    }
    else{
      console.log("Super Admin logged in");
      const authUserInfo = localStorage.getItem('admin');
      console.log("Profile ADMIN:",JSON.parse(authUserInfo).adminId);
      this.userDetails = JSON.parse(authUserInfo);
      console.log(this.userDetails);
    }
    
  }

  onSubmit(form:NgForm)
  {
    console.log(form.value);

    if(localStorage.getItem('quizMaster')!=null)
    {
      var newFormValue = {...form.value,quizMasterId:this.userId};
      this.quizMasterService.editQuizMasterDetails(newFormValue).subscribe(res=>{
        if(res["status"])
        {
          this.toast.success(res["message"],"Successs",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          });
          localStorage.setItem('quizMaster', JSON.stringify(res["quizMaster"]));
          //to update name on header
          this.authService.isProfileImageChanged.next(true);
          this.closeModel();
        }
        else
        {
          this.toast.error("Details not updated....error occured("+res["message"]+")","Error",{
            timeOut:2500,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right'
          })
        }
      })
   }
   else{
    var newFormValue = {...form.value,adminId:this.userId};
    this.adminService.editAdminDetails(newFormValue).subscribe(res=>{
      if(res["status"])
      {
        this.toast.success(res["message"],"Successs",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        });
        localStorage.setItem('admin', JSON.stringify(res["admin"]));
        //to update name on header
        this.authService.isProfileImageChanged.next(true);
        this.closeModel();
      }
      else
      {
        this.toast.error("Details not updated....error occured("+res["message"]+")","Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
    })
   }
  
  }

  password()
  {
    console.log("Visibility Changed")
    this.showPassword = !this.showPassword;
  }

  closeModel()
  {
    this.dialogRef.close();
    this.authService.filter("Deleted");
  }

}
