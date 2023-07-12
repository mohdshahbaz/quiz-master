import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestsService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api";

  constructor(private http: HttpClient) { }

  getAllPaymentRequests() {
    return this.http.get(this.serverUrl + '/all-payment-requests/');
  }
}
