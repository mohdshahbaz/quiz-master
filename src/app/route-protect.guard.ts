import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteProtectGuard implements CanActivate {

  constructor(
    private router: Router,private authService:AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    if(localStorage.getItem('quizMaster') != null) {
      const quizMaster = JSON.parse(localStorage.getItem('quizMaster'));
      console.log(quizMaster.quizMasterId,quizMaster.quizMaster);
      if((+quizMaster.quizMaster)==1)
      {
        return true;
      }
      else{
        this.router.navigate(['/not-authorized']);
        return false;
      }      
    }
    else {
      this.router.navigate(['/not-authorized']);
      return false;
    }

  }
  
}
