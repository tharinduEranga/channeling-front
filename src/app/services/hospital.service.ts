import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends DataService<HospitalDTO> {
  constructor(private httpClient: HttpClient) {
    super('hospitals/', httpClient);
  }
}
