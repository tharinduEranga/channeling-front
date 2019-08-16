import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {MedicineService} from '../../../services/medicine.service';
import {BrandService} from '../../../services/brand.service';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-save-medicine',
  templateUrl: './save-medicine.component.html',
  styleUrls: ['./save-medicine.component.scss']
})
export class SaveMedicineComponent implements OnInit {
  private medicine = {
    medicineId: 0,
    medicineName: null,
    price: null,
    qty: null,
    brand : {
      brandId: 0,
      brandName: null
    }
  };
  private brand: BrandsDTO;

  private brandArray: BrandsDTO[] = [];

  private myControlBrand = new FormControl();

  private filteredBrands: Observable<BrandsDTO[]>;

  constructor(private medicineService: MedicineService, private brandService: BrandService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllBrands();
    this.setMedicine();
  }

  setBrand(brand) {
    this.medicine.brand = brand;
  }

  saveMedicine() {
    if (this.medicineService.getisUpdate()) {
      this.medicineService.update(this.medicine).subscribe(value => {
        if (value.success) {
          Swal.fire('Done!', 'Medicine is Updated!', 'success');
          this.dialog.closeAll();
        } else {
          Swal.fire('Failed!', value.message, 'error');
        }
      });
    } else {
      this.medicine.medicineId = 0;
      this.medicineService.save(this.medicine).subscribe(value => {
        if (value.success) {
          Swal.fire('Done!', 'Medicine is Added!', 'success');
          this.dialog.closeAll();
        } else {
          Swal.fire('Failed!', value.message, 'error');
        }
      });
    }
  }

  private getAllBrands() {
    this.brandService.getAll().subscribe(value => {
      if (value.success) {
        this.brandArray = value.body;
        this.filteredBrands = this.myControlBrand.valueChanges
            .pipe(
                startWith(''),
                map(brand => typeof brand === 'string' ? brand : brand.name),
                map(name => name ? this._filterBrand(name) : this.brandArray.slice())
            );
      }
    });
  }

  private _filterBrand(name: string): BrandsDTO[] {
    const filterValue = name.toLowerCase();
    return this.brandArray.filter(option => option.brandName.toLowerCase().indexOf(filterValue) === 0);
  }

  private setMedicine() {
    const medicine = this.medicineService.getMedicine();
    if (medicine !== undefined) {
      this.medicine = JSON.parse(JSON.stringify(medicine));
      this.myControlBrand.setValue(this.medicine.brand);
    }

  }

  displayFnBrand(brand ?: BrandsDTO): string | undefined {
    return brand ? brand.brandName : undefined;
  }
}
