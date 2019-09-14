import { Injectable } from '@angular/core';
import {Common} from '../util/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_URL = Common.BASE_URL + 'admins/';
  private _isLogged = false;
  private _userData = {
    admin: {
      adminId: 0,
      userName: null,
      password: null,
      roles: null
    },
    token: null
  };
  constructor(private httpClient: HttpClient) { }

  loginAdmin(adminDTO): Observable<CommonResponse<AdminDTO>> {
    return this.httpClient.post<CommonResponse<AdminDTO>>(this.LOGIN_URL + 'login', adminDTO);
  }

  get isLogged(): boolean {
    return this._userData !== undefined && this._userData != null;
  }

  get userData() {
    return JSON.parse(localStorage.getItem('userData'));
  }

  set userData(value) {
    this._userData = value;
    if (value !== null) {
      localStorage.setItem('userData', JSON.stringify(this._userData.admin));
      localStorage.setItem('token', this._userData.token);
      this._isLogged = true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      this._isLogged = false;
    }
  }
}
