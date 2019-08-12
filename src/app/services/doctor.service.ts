import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './common/data.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends DataService<DoctorDTO> {
  private doctor: DoctorDTO ;
  constructor(private httpClient: HttpClient) {
    super('doctors/', httpClient);
  }
  public setdoctor(doctor) {
    this.doctor = doctor;
  }
  public getDoctor() {
    return this.doctor;
  }
}
