import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,private authService:AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {  
      // var adminUserType;
      // this.authService.authUserTypeAdmin.subscribe(res=>{
      //   adminUserType = res;
      // })
      // if(adminUserType==false)
      // {
      //   const quizMaster = JSON.parse(localStorage.getItem('quizMaster'));
      //   console.log(quizMaster.quizMasterId);
      //   return true;
      // }else {
      //   this.router.navigate(['/login']);
      //   return false;
      // }
      if(localStorage.getItem('quizMaster') != null) {
        const quizMaster = JSON.parse(localStorage.getItem('quizMaster'));
        console.log(quizMaster.quizMasterId);
        return true;
      }
      else if(localStorage.getItem('admin') != null)
      {
        const admin = JSON.parse(localStorage.getItem('admin'));
        console.log(admin.adminId);
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
      
  }
  
}
