import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serverUrl = "http://82.180.160.159:8080/api/";

  constructor(private http:HttpClient) { }

  editAdminImage(data) {
    return this.http.post(this.serverUrl + '/edit-superAdmin-image', data);
  }

  editAdminDetails(data) {
    return this.http.post(this.serverUrl + '/edit-admin-details', data);
  }
    
  sendPasswordResetToken(data) {
    return this.http.post(this.serverUrl + '/admin-send-token', data);
  }

  forgotPassword(data) {
    return this.http.post(this.serverUrl + '/admin-forgot-pwd', data);
  }

}
