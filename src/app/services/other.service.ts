import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtherService {
  private isHospital = true;
  constructor() { }
  getIsHospital() {
    return this.isHospital;
  }
  setIsHospital(isHospital) {
    this.isHospital = isHospital;
  }
}
