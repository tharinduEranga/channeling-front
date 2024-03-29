import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DaysService extends DataService<DaysDTO> {

  constructor(private httpClient: HttpClient) {
    super ('days/', httpClient);
  }

}
