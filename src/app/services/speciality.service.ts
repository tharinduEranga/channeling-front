import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService extends DataService<SpecialityDTO> {
  constructor(private httpClient: HttpClient) {
    super('speciality/', httpClient);
  }
}
