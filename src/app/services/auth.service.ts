import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn = new BehaviorSubject<boolean>(false);
  authUser = new BehaviorSubject<object>(null);
  authUserTypeAdmin = new BehaviorSubject<boolean>(false);    //whether quiz master , OR super admin is loggedIn

  isProfileImageChanged = new BehaviorSubject<boolean>(false);

  serverUrl = "http://82.180.160.159:8080/api/";

  constructor(
    private http: HttpClient
  ) { }

  private listeners = new Subject<any>();
  listen():Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy)
  {
    this.listeners.next(filterBy);
  }

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  authenticateQuizMasterLogin(data) {
    return this.http.post(this.serverUrl + 'quiz-master-login', data);
  }

  adminLogin(data)
  {
    return this.http.post(this.serverUrl+'/admin-login/',data);  
  }

  //method to implement auto-login functionality
  autoLogin()
  {
  //now we will retrieve all data from local storage , whenever the application restarts    
    if(localStorage.getItem('quizMaster'))      
    {
      const authUserInfo = localStorage.getItem('quizMaster');
      console.log(authUserInfo);
      //checking if that data key exists
      if(!authUserInfo)
      {
        return;
      }
      else{
        //emitting login details to BehaviourSubject
        this.isLoggedIn.next(true);
        this.authUser.next(JSON.parse(authUserInfo));
        this.authUserTypeAdmin.next(false);
      }
    }
    else{
      const authUserInfo = localStorage.getItem('admin');
      console.log(authUserInfo);
      //checking if that data key exists
      if(!authUserInfo)
      {
        return;
      }
      else{
        //emitting login details to BehaviourSubject
        this.isLoggedIn.next(true);
        this.authUser.next(JSON.parse(authUserInfo));
        this.authUserTypeAdmin.next(true);
      }
    }   
     
  }
}
