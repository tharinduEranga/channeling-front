import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from './common/data.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService extends DataService<DoctorDTO> {
  constructor(private httpClient: HttpClient) {
    super('doctors/', httpClient);
  }
}
