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

  getSingleUser(id) {
    return this.http.get(this.serverUrl + '/get-user-details/'+id);
  }

  getAllStudentGroups() {
    return this.http.get(this.serverUrl + '/get-all-student-groups');
  }

  getStudentGroupByQuizMasterId(id) {
    return this.http.get(this.serverUrl + '/get-student-groups-by-quizMaster/' + id);
  }

  createStudentsGroup(data) {
    return this.http.post(this.serverUrl  + '/create-students-group', data);
  }

  getSingleGroupDetails(id)
  {
    return this.http.get(this.serverUrl + '/get-all-student-groups/' + id);
  }

  editStudentsGroup(data) {
    return this.http.post(this.serverUrl  + '/edit-group-students', data);
  }

  editUserDetailsAdmin(data) {
    return this.http.post(this.serverUrl  + '/edit-user-details-admin', data);
  }

}
