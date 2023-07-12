import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicQuestionsService {

  serverUrl = "https://quizeeeapp.onrender.com/api";
  
  currentQues = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) { }

  getAllPublicQuestions() {
    return this.http.get(this.serverUrl + '/get-all-masters-questions');
  }

  changeQuestionsStatusToPublic(data) {
    return this.http.post(this.serverUrl + '/change-questions-status-to-public',data);
  }

  moveQuestionToPractice(data) {
    return this.http.post(this.serverUrl + '/move-question-to-practice',data);
  }

  moveQuestionToPublic(data) {
    return this.http.post(this.serverUrl + '/move-question-to-public',data);
  }
  
  getAllQuizMasterQuestions(id) {
    return this.http.get(this.serverUrl + '/quizee-master-all-questions/'+id);
  }

  deleteSingleQuestion(data) {
    return this.http.post(this.serverUrl + '/delete-single-question/',data);
  }

  addQuestionImage(data)
  {
    return this.http.post(this.serverUrl+'/add-question-image', data);
  }

  addQuizMasterQuestions(data)
  {
    return this.http.post(this.serverUrl+'/add-quizMaster-questions', data);
  }

  getSingleQuestionDetails(qMasterId,questionId)
  {
    return this.http.get(this.serverUrl + '/get-single-question-detail/'+qMasterId+"/"+questionId);
  }

  editSingleQuestion(data)
  {
    return this.http.post(this.serverUrl + '/edit-single-question/',data);
  }

}
