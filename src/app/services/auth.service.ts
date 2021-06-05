import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  serverUrl = "https://quizeee-app-api.herokuapp.com/api/";

  constructor(
    private http: HttpClient
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  authenticateLogin(data) {
    return this.http.post(this.serverUrl + 'quiz-master-login', data);
  }
}
