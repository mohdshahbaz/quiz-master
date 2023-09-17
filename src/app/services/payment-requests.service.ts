import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestsService {

  serverUrl = "http://82.180.160.159:8080/api";

  constructor(private http: HttpClient) { }

  getAllPaymentRequests() {
    return this.http.get(this.serverUrl + '/all-payment-requests/');
  }
}
