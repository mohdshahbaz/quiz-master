import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  serverUrl = "https://quizeee-app-api.herokuapp.com/api/";

  constructor(private http:HttpClient) { }

  getAllBanners() {
    return this.http.get(this.serverUrl + '/get-all-banners');
  }

  getSingleBanner(id) {
    return this.http.get(this.serverUrl + '/get-banner-by-id/'+id);
  }

  editSingleBanner(data) {
    return this.http.post(this.serverUrl + '/edit-single-banner',data);
  }

  addSingleImage(data)
  {
    return this.http.post(this.serverUrl + '/add-single-image',data);
  }

}
