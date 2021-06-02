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
    return this.http.get(this.serverUrl + '/quizee-master-all-quizes/' + id);
  }

  editPublicQuiz(id) {
    return this.http.get(this.serverUrl + '/get-quizee-master-quiz/' + id);
  }

}
