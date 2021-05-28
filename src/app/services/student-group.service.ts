import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentGroupService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api";

  constructor(
    private http: HttpClient
  ) { }

  
  getAllUsers() {
    return this.http.get(this.serverUrl + '/get-all-users');
  }

  getAllStudentGroups() {
    return this.http.get(this.serverUrl + '/get-all-student-groups');
  }

}
