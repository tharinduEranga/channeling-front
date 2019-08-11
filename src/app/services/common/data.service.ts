import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Common} from '../../util/common';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService <T> {
  private readonly API_URL = Common.BASE_URL;
  constructor(private url: string, private http: HttpClient) {
    this.API_URL = this.API_URL + url;
  }

  save (resource) {
    return this.http.post(this.API_URL, resource);
  }
  update (resource) {
    return this.http.put(this.API_URL, resource);
  }
  delete (id) {
    return this.http.delete<CommonResponse<T>>(this.API_URL + id);
  }
  search (id): Observable<CommonResponse<T>> {
    return this.http.get<CommonResponse<T>>(this.API_URL + id);
  }
  getAll (): Observable<CommonResponse<T[]>> {
    return this.http.get<CommonResponse<T[]>>(this.API_URL);
  }
}
