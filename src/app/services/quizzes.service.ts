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

  createPublicQuiz(data)
  {
    return this.http.post(this.serverUrl + '/create-quizee-master-quiz/',data);
  }

  editPublicQuiz(data)
  {
    return this.http.post(this.serverUrl + '/edit-quizee-master-quiz/',data);
  }

  createAssignedQuiz(data)
  {
    return this.http.post(this.serverUrl + '/create-organization-master-quiz/',data);
  }

  editAssignedQuiz(data)
  {
    return this.http.post(this.serverUrl + '/edit-organization-master-quiz/',data);
  }

  getAllAssignedEnrollments(userId, quizMasterId)
  {
    return this.http.get(this.serverUrl + '/user-assignedQuiz-enrollments/' + userId+"/"+quizMasterId); 
  }

  getUserAssignedQuizzesPerformance(userId, quizMasterId)
  {
    return this.http.get(this.serverUrl + '/user-assigned-performances/' + userId+"/"+quizMasterId); 
  }

  getAssignedQuizStudentsPerformances(quizId)
  {
    return this.http.get(this.serverUrl + '/assigned-quiz-performance-history/' + quizId); 
  }

  userCategoryWiseGraph(data)
  {
    return this.http.post(this.serverUrl + '/user-categoryWise-graph/',data); 
  }

}
