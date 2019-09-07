import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';
import {Common} from '../util/common';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService extends DataService<AppointmentsDTO> {
  private readonly APPOINTMENT_URL = Common.BASE_URL + 'appointments/';
  private _appointment: AppointmentsDTO;

  constructor(private httpClient: HttpClient) {
    super('appointments/', httpClient);
  }

  getFutureAppointments() {
    return this.httpClient.get<CommonResponse<AppointmentsDTO[]>>(this.APPOINTMENT_URL + 'future');
  }

  getAppointment(): AppointmentsDTO {
    return this._appointment;
  }

  setAppointment(value: AppointmentsDTO) {
    this._appointment = value;
  }
}
