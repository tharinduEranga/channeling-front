import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';
import {MedicineDTO} from '../dto/medicineDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends DataService<MedicineDTO> {

  constructor(private httpClient: HttpClient) {
    super('medicine/', httpClient)
  }
}
