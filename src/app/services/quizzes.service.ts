import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api";

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(data) {
    return this.http.post(this.serverUrl + '/get-questions-by-category', data);
  }

  getAllUsers() {
    return this.http.get(this.serverUrl + '/get-all-users');
  }

  getAllStudentGroups() {
    return this.http.get(this.serverUrl + '/get-all-student-groups');
  }

}
