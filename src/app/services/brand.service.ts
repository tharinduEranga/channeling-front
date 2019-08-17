import { Injectable } from '@angular/core';
import {DataService} from './common/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends DataService<BrandsDTO> {
  private brand: BrandsDTO;
  private isUpdate = false;

  constructor(private httpClient: HttpClient) {
    super('brands/', httpClient);
  }

  setBrand(brand: BrandsDTO) {
    this.brand = brand;
  }
  getBrand() {
    return this.brand;
  }

  setIsUpdate(isUpdate: boolean) {
    this.isUpdate = isUpdate;
  }

  getIsUpdate() {
    return this.isUpdate;
  }
}
