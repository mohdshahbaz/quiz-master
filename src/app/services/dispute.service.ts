import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisputeService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getAllDisputes() {
    return this.http.get(this.serverUrl + '/get-all-reports');
  }

}
