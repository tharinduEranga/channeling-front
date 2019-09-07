import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends DataService<AppointmentsDTO> {

  private _appointment: AppointmentsDTO;

  constructor(private httpClient: HttpClient) {
    super('appointments/', httpClient);
  }

  getAppointment(): AppointmentsDTO {
    return this._appointment;
  }

  setAppointment(value: AppointmentsDTO) {
    this._appointment = value;
  }
}
