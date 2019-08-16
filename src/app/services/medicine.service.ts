import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';
import {MedicineDTO} from '../dto/medicineDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends DataService<MedicineDTO> {
  private isUpdate = false;
  private medicine: MedicineDTO;
  constructor(private httpClient: HttpClient) {
    super('medicine/', httpClient)
  }

  setIsUpdate(b: boolean) {
    this.isUpdate = b;
  }

  getisUpdate() {
    return this.isUpdate;
  }

  setMedicine(medicine: MedicineDTO) {
    this.medicine = medicine;
  }

  getMedicine(): MedicineDTO {
    return this.medicine;
  }

}
