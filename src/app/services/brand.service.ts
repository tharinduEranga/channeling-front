import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends DataService<BrandsDTO> {

  constructor(private httpClient: HttpClient) {
    super('brands/', httpClient);
  }
}
