import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Common} from '../util/common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly REPORTS_URL = Common.BASE_URL ;
  constructor(private httpClient: HttpClient) { }

  getAppointmentsMonthWiseByYear(year: string): Observable<CommonResponse<MonthWiseApintmnts[]>> {
    return this.httpClient.get<CommonResponse<MonthWiseApintmnts[]>>(this.REPORTS_URL + 'appointments/monthwise/count/' + year);
  }
}
