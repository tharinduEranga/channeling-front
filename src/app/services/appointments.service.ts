import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends DataService<AppointmentsDTO> {

  constructor(private httpClient: HttpClient) {
    super('appointments/', httpClient);
  }
}
