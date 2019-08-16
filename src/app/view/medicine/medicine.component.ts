import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MedicineDTO} from '../../dto/medicineDTO';
import {MedicineService} from '../../services/medicine.service';
import {BrandService} from '../../services/brand.service';
import {SaveMedicineComponent} from './save-medicine/save-medicine.component';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {
  medicineColumns: string[] = ['medicineName', 'price', 'qty', 'brand', 'medActions'];
  brandColumns: string[] = ['brandId', 'brandName', 'brandActions'];

  medDataSource: MatTableDataSource<MedicineDTO>;
  brandDataSource: MatTableDataSource<BrandsDTO>;

  medicine: MedicineDTO[] = [] ;
  brands: BrandsDTO[] = [] ;

  @ViewChild('medPaginator', {static: true}) medPaginator: MatPaginator;
  @ViewChild('medSort', {static: true}) medSort: MatSort;

  @ViewChild('brandPaginator', {static: true}) brandPaginator: MatPaginator;
  @ViewChild('brandSort', {static: true}) brandSort: MatSort;

  isLoading: boolean;

  constructor(private medicineService: MedicineService, private brandService: BrandService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllMedicine();
    this.getAllBrands();
  }

  getAllMedicine() {
    this.isLoading = true;
    this.medicineService.getAll().subscribe( value => {
      if (value.success) {
        // @ts-ignore
        this.medicine = value.body;
        // Assign the data to the data source for the table to render
        this.medDataSource = new MatTableDataSource(this.medicine);
        this.medDataSource.paginator = this.medPaginator;
        this.medDataSource.sort = this.medSort;
        this.medDataSource.sortingDataAccessor = (item, property) => {
          if (property === 'brand') {
            return item.brand.brandName;
          } else {
            return item[property];
          }
        };
        this.medDataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if (key === 'brand') {
              return currentTerm + data.brand.brandName;
            }  else {
              return currentTerm + data[key];
            }
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.isLoading = false;
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }

    });
  }

  getAllBrands() {
    this.isLoading = true;
    this.brandService.getAll().subscribe( value => {
      // @ts-ignore
      if (value.success) {
        this.brands = value.body;
        // Assign the data to the data source for the table to render
        this.brandDataSource = new MatTableDataSource(this.brands);
        this.brandDataSource.paginator = this.brandPaginator;
        this.brandDataSource.sort = this.brandSort;
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }

      this.isLoading = false;
    });
  }

  addNewClick() {
    this.medicineService.setIsUpdate(false);
    this.medicineService.setMedicine(undefined);
    this.openAddMedDialog();
  }

  applyMedFilter(filterValue: string) {
    this.medDataSource.filter = filterValue.trim().toLowerCase();

    if (this.medDataSource.paginator) {
      this.medDataSource.paginator.firstPage();
    }
  }

  applyBrandFilter(filterValue: string) {
    this.brandDataSource.filter = filterValue.trim().toLowerCase();

    if (this.brandDataSource.paginator) {
      this.brandDataSource.paginator.firstPage();
    }
  }

  tableClick(row: any) {
    this.medicineService.setMedicine(row);
    this.medicineService.setIsUpdate(true);
    this.openAddMedDialog();
  }

  tableDelete(row: any) {
    Swal.fire('tbl', 'delete', 'success');
  }

  addNewBrand() {
    Swal.fire('btn', 'brand', 'success');
  }

  brandTblDeleteClick(row: any) {
  }

  brandTblEditClick(row: any) {
  }

  private openAddMedDialog() {
    this.dialog.open(SaveMedicineComponent).afterClosed().subscribe(value => {
      this.medicineService.setMedicine(undefined);
      this.getAllMedicine();
    });
  }
}
