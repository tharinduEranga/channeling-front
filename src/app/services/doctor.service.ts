import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) {
  }

  getAllDoctors(): Observable<CommonResponse<DoctorDTO[]>> {
    return this.httpClient.get<CommonResponse<DoctorDTO[]>>('http://localhost:8080/api/doctors/');
  }
}
