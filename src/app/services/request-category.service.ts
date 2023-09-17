import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestCategoryService {

  serverUrl = "http://82.180.160.159:8080/api";

  constructor(
    private http: HttpClient
  ) { }

  createNewRequest(data) { 
    return this.http.post(this.serverUrl + '/create-new-request', data)
  }

  getAllNonSelectedRequests() {
    return this.http.get(this.serverUrl + '/get-all-nonSelected-requests');
  }

  getAllSelectedRequests() {
    return this.http.get(this.serverUrl + '/get-all-selected-requests');
  }

  addRequestedCategory(selectedId) {
    return this.http.get(this.serverUrl + '/add-to-selection/' + selectedId);
  }

  deleteRequestedCategory(selectedId) {
    return this.http.get(this.serverUrl + '/delete-selected-request/' + selectedId);
  }

}
