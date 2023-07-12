import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { QuizMasterService } from 'src/app/services/quiz-master.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id;
  fullName = '';
  email = '';
  profileImage;

  mediaFile;
  
  constructor(public matDialog:MatDialog,private spinner: NgxSpinnerService,
    private quizMasterService:QuizMasterService,private authService:AuthService,private adminService:AdminService) { 
    this.authService.listen().subscribe((m:any)=>{
      console.log(m);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {

    if(localStorage.getItem('quizMaster')!=null)
    {
      console.log("Quiz Master logged in");
      const authUserInfo = localStorage.getItem('quizMaster');
      console.log("Profile:",JSON.parse(authUserInfo).quizMasterId);
      this.id = JSON.parse(authUserInfo).quizMasterId;
      this.fullName = JSON.parse(authUserInfo).name;
      this.email = JSON.parse(authUserInfo).email;
      this.profileImage = JSON.parse(authUserInfo).quizMasterImage;
      console.log(this.profileImage);
    }
    else{
      console.log("Super Admin logged in");
      const authUserInfo = localStorage.getItem('admin');
      console.log("Profile ADMIN:",JSON.parse(authUserInfo).adminId);
      this.id = JSON.parse(authUserInfo).adminId;
      this.fullName = JSON.parse(authUserInfo).name;
      this.email = JSON.parse(authUserInfo).email;
      this.profileImage = JSON.parse(authUserInfo).adminImage;
      console.log(this.profileImage);
    }
    
  }

  selectImage(event)
  {
    const file = event.target.files[0];
    this.mediaFile = file;
    console.log("Media File : ",this.mediaFile);
    
    if(localStorage.getItem('quizMaster')!=null)
    {
      const formData = new FormData();   
      formData.append("quizMasterId",this.id);
      formData.append("profilePic",this.mediaFile);
  
      if(this.mediaFile!=null)
      {
        this.spinner.show();
      }
  
      this.quizMasterService.editQuizMasterImage(formData).subscribe(res=>{
        if(res["status"])
        {
          this.profileImage = res["quizMaster"].quizMasterImage;        
          localStorage.setItem('quizMaster', JSON.stringify(res["quizMaster"]));
          console.log("ProfileImage : ",this.profileImage);
          this.authService.isProfileImageChanged.next(true);
          this.spinner.hide();
          this.ngOnInit();
        }
      });      
    }
    else{
      const formData = new FormData();   
      formData.append("adminId",this.id);
      formData.append("profilePic",this.mediaFile);
  
      if(this.mediaFile!=null)
      {
        this.spinner.show();
      }
  
      this.adminService.editAdminImage(formData).subscribe(res=>{
        if(res["status"])
        {
          this.profileImage = res["admin"].quizMasterImage;        
          localStorage.setItem('admin', JSON.stringify(res["admin"]));
          console.log("ProfileImage : ",this.profileImage);
          this.authService.isProfileImageChanged.next(true);
          this.spinner.hide();
          this.ngOnInit();
        }
      });    
  
    }
   
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    //if the user clicks outside the modal, it doesn’t close
    dialogConfig.disableClose = true;
    dialogConfig.id = 'edit-profile-component';
    dialogConfig.height = "550px";
    dialogConfig.width = "1000px";
    //passing data
    dialogConfig.data = {userId:this.id}
    
    const modalDialog = this.matDialog.open(EditProfileComponent,dialogConfig);   

  }

}
