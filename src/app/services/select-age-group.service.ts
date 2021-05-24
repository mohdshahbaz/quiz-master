import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectAgeGroupService {

  private data = {};

  constructor() { }

  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }

}
