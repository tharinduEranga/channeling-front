import { Injectable } from '@angular/core';
import {Common} from '../util/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_URL = Common.BASE_URL + 'admins/';

  constructor(private httpClient: HttpClient) { }

  loginAdmin(adminDTO): Observable<CommonResponse<AdminDTO>> {
    return this.httpClient.post<CommonResponse<AdminDTO>>(this.LOGIN_URL + 'login', adminDTO);
  }
}
