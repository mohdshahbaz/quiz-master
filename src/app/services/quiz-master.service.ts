import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizMasterService {

  serverUrl = "https://quizeeeapp.onrender.com/api";

  constructor(private http: HttpClient) { }

  getAllQuizMasters() {
    return this.http.get(this.serverUrl + '/all-quiz-masters');
  }

  getParticularQuizMaster(id) {
    return this.http.get(this.serverUrl + '/get-quiz-master/'+id);
  }

  createQuizMaster(data) {
    return this.http.post(this.serverUrl + '/create-quiz-master', data);
  }

  editQuizMasterImage(data) {
    return this.http.post(this.serverUrl + '/edit-quizMaster-image', data);
  }

  editQuizMasterDetails(data) {
    return this.http.post(this.serverUrl + '/edit-quiz-master-details', data);
  }

  editQuizMasterAllDetails(data) {
    return this.http.post(this.serverUrl + '/edit-quiz-master-all-details', data);
  }

}
