import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizMasterService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getAllQuizMasters() {
    return this.http.get(this.serverUrl + '/all-quiz-masters');
  }

  createQuizMaster(data) {
    debugger;
    return this.http.post(this.serverUrl + '/create-quiz-master', data);
  }

}
