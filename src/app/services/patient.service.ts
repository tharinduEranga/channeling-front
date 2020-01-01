import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './common/data.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends DataService<PatientDTO> {
  private isUpdate: boolean;
  private patient: PatientDTO;
  constructor(private httpClient: HttpClient) {
    super('patients/', httpClient);
  }

  getIsUpdate() {
    return this.isUpdate;
  }
  setIsUpdate(isUpdate: boolean) {
    this.isUpdate = isUpdate;
  }
  getPatient(): PatientDTO {
    return this.patient;
  }
  setPatient(patient: PatientDTO) {
    this.patient = patient;
  }
}
