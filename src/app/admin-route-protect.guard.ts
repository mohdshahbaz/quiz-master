import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteProtectGuard implements CanActivate {

  constructor(
    private router: Router,private authService:AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(localStorage.getItem('admin') != null) {
      const admin = JSON.parse(localStorage.getItem('admin'));
      console.log(admin.adminId);
      return true;
    }
    else {
      this.router.navigate(['/not-authorized']);
      return false;
    }

  }
  
}
