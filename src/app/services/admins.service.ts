import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminsService extends DataService<AdminDTO> {

  constructor(private httpClient: HttpClient) {
     super('admins/', httpClient);
  }
}
