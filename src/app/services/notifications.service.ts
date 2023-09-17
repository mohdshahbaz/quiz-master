import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  serverUrl = "http://82.180.160.159:8080/api";

  constructor(private http: HttpClient) { }

  sendNotificationToAllUsers(data) {
    return this.http.post(this.serverUrl + '/send-notification-all-users',data);
  }

  sendNotificationToSingleGroup(data) {
    return this.http.post(this.serverUrl + '/send-notification-single-group',data);
  }

}
