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

  getQuizzesByQuizMasterId(id) {
    return this.http.get(this.serverUrl + '/all-quizzes-by-quiz-master/' + id);
  }

  getSinglePublicQuiz(id) {
    return this.http.get(this.serverUrl + '/get-quizee-master-quiz/' + id);
  }

  getSingleAssignedQuiz(id) {
    return this.http.get(this.serverUrl + '/get-organization-master-quiz/' + id);
  }

}
