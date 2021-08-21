import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {  
      //if(localStorage.getItem('quizMaster') != null) {
      if(true) {
        const quizMaster = JSON.parse(localStorage.getItem('quizMaster'));
        console.log(quizMaster.quizMasterId);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}
