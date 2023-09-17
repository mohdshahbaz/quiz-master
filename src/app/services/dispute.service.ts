import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {

  serverUrl = "http://82.180.160.159:8080/api";

  constructor(private http: HttpClient) { }

  getAllDisputes() {
    return this.http.get(this.serverUrl + '/get-all-reports');
  }

}
