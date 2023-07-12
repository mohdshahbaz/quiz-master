import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSuperAdmin = true;
  forgotPwd = false;
  resetPassword = false;

  @ViewChild('username',{static:true}) email:ElementRef;
  @ViewChild('tokenName',{static:true}) tokenNm:ElementRef;
  @ViewChild('newPassword',{static:true}) newPwd:ElementRef;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private adminService:AdminService,
    private spinnerService:SpinnerService
  ) { }

  ngOnInit(): void {
  }

  toggle()
  {
    this.isSuperAdmin = !this.isSuperAdmin;
  }

  login(email, password) {
    const data = {
      email: email,
      password: password
    }

    this.spinnerService.requestStarted();
    if(!this.isSuperAdmin)
    {
      this.authService.authenticateQuizMasterLogin(data).subscribe(res => {
        if (res['status']) {
          this.spinnerService.requestEnded();
          this.toastr.success(res['message']);
          this.router.navigate(['/all-quizzes',res['quizMaster'].quizMasterId]);
          localStorage.setItem('quizMaster', JSON.stringify(res['quizMaster']));
          this.authService.isLoggedIn.next(true);
          this.authService.authUser.next(res['quizMaster']);
          this.authService.authUserTypeAdmin.next(false);
        } else {
          this.spinnerService.requestEnded();
          this.toastr.error(res['message']);
        }  
      });
    }
    else{
      this.authService.adminLogin(data).subscribe(res=>{
        if (res['status']) {

          this.spinnerService.requestEnded();

          this.toastr.success(res['message']);
          this.router.navigate(['/main-content']);
          localStorage.setItem('admin', JSON.stringify(res['admin']));
          this.authService.isLoggedIn.next(true);
          this.authService.authUser.next(res['admin']);
          // window.location.reload();
          this.authService.authUserTypeAdmin.next(true);
        } else {
          this.spinnerService.requestEnded();
          this.toastr.error(res['message']);
        }  
      });
    }
   
  }


  forgotPassword()
  {
    this.forgotPwd=true;
    console.log("Forgot Pwd");
    console.log("SuperAdmin : ",this.isSuperAdmin);
  }

  toggleForgotPassword()
  {
    this.forgotPwd = !this.forgotPwd;
  }

  resetPwd(form:NgForm)
  {
    var checkSuperAdmin;
    if(this.isSuperAdmin==true)
    {
      checkSuperAdmin = 1;
    }
    else{
      checkSuperAdmin = 0;
    }
    var formValue = {...form.value,isSuperAdmin:+checkSuperAdmin}
    console.log(formValue);
    this.adminService.forgotPassword(formValue).subscribe(res=>{
      if(res["status"]){
        this.toastr.success(res["message"]);
        this.ngOnInit();
        this.forgotPwd = false;
        this.router.navigate(['/login']);
        
      }else{
        this.toastr.error(res["message"]);
      }

    })
    
  }

  sendEmail(form:NgForm)
  {
    console.log(form.value);
    var checkSuperAdmin;
    if(this.isSuperAdmin==true)
    {
      checkSuperAdmin = 1;
    }
    else{
      checkSuperAdmin = 0;
    }
     this.adminService.sendPasswordResetToken({email:form.value.email,isSuperAdmin:+checkSuperAdmin}).subscribe(res=>{
      console.log(res);
      if(res["status"]){
        this.toastr.success(res["message"]);
       
      }else{
        this.toastr.error(res["message"]);
      }

    })

  }

}
