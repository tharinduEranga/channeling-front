import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends DataService<PaymentsDTO> {

  constructor(private httpClient: HttpClient) {
    super('payments/', httpClient);
  }
}
