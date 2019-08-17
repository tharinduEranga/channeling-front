import { Component, OnInit } from '@angular/core';
import {BrandService} from '../../../services/brand.service';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-save-brand',
  templateUrl: './save-brand.component.html',
  styleUrls: ['./save-brand.component.scss']
})
export class SaveBrandComponent implements OnInit {

  private brandObject = {
    brandId: 0,
    brandName: null
  };
  private isUpdate = false;
  constructor(private brandService: BrandService, private dialog: MatDialog) { }

  ngOnInit() {
    this.isUpdate = this.brandService.getIsUpdate();
    this.setBrand();
  }

  saveData() {
    if (this.brandService.getIsUpdate()) {
      this.brandService.update(this.brandObject).subscribe(value => {
        if (value.success) {
          Swal.fire('Done!', 'Brand is Updated!', 'success');
          this.dialog.closeAll();
        } else {
          Swal.fire('Failed!', value.message, 'error');
        }
      })
    } else {
      this.brandService.save(this.brandObject).subscribe(value => {
        if (value.success) {
          Swal.fire('Done!', 'Brand is Added!', 'success');
          this.dialog.closeAll();
        } else {
          Swal.fire('Failed!', value.message, 'error');
        }
      })
    }
  }

  private setBrand() {
    if (this.brandService.getBrand() !== undefined) {
      this.brandObject = JSON.parse(JSON.stringify(this.brandService.getBrand()));
    }
  }
}
