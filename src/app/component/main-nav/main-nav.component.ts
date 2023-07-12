import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  isLoggedIn;
  loggedInUser;
  authUserTypeAdmin;
  quizMasterId = 0;
  profileImage;

  quizMasterPublic;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
    ) {
      this.authService.isProfileImageChanged.subscribe(imgRes=>{
        if(imgRes)
        {
          this.ngOnInit();
        }
      })
    }

    ngOnInit() {
      this.authService.autoLogin();
      this.authService.isLoggedIn.subscribe(res=>{
        this.isLoggedIn = res;
        console.log("Is Logged In : ", this.isLoggedIn);
        if(this.isLoggedIn)
        {
        this.authService.authUser.subscribe(authRes=>{
            this.loggedInUser = authRes;

            this.authService.authUserTypeAdmin.subscribe(typeRes=>{
              this.authUserTypeAdmin = typeRes; 
              console.log(this.authUserTypeAdmin);
              if(!this.authUserTypeAdmin)
              {
                console.log(+JSON.parse(localStorage.getItem('quizMaster')).quizMaster);
                this.quizMasterId = +JSON.parse(localStorage.getItem('quizMaster'))['quizMasterId'];
                console.log(JSON.parse(localStorage.getItem('quizMaster'))['quizMasterImage']);
                this.profileImage = JSON.parse(localStorage.getItem('quizMaster'))['quizMasterImage'];
                if(+JSON.parse(localStorage.getItem('quizMaster')).quizMaster==1)
                {
                  this.quizMasterPublic = true;
                  console.log("Public Quiz Master");
                }
                else{
                  this.quizMasterPublic = false;
                }
              }
              else{
                this.profileImage = JSON.parse(localStorage.getItem('admin'))['adminImage'];
              }
            })            
         })  
        }
      });

      // this.isLoggedIn$ = this.authService.isLoggedIn;
      // this.isLoggedIn$.subscribe(res=>{
      //   console.log("Logged In :", res);
      // })
      // console.log("Is Logged In : ", this.isLoggedIn$.subscribe);
    }

  logout(element) {

    if(localStorage.getItem('quizMaster')) {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.authService.isLoggedIn.next(false);
      localStorage.removeItem('quizMaster');
    }
    else if(localStorage.getItem('admin'))
    {
      localStorage.clear();
      this.router.navigate(['/login']);
      this.authService.isLoggedIn.next(false);
      localStorage.removeItem('admin');
    }
    else {
      this.router.navigate(['/login']);
    }
   
  }

}
