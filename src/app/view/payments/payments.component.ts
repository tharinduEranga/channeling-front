import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import Swal from 'sweetalert2';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MedicineDTO} from '../../dto/medicineDTO';
import {MedicineService} from '../../services/medicine.service';
import {SaveMedicineComponent} from '../medicine/save-medicine/save-medicine.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  medicineColumns: string[] = ['medicineName', 'price', 'qty', 'brand'];
  paymentColumns: string[] = ['paymentId', 'date', 'amount', 'patient'];

  medDataSource: MatTableDataSource<MedicineDTO>;
  paymentDataSource: MatTableDataSource<PaymentsDTO>;

  medicine: MedicineDTO[] = [] ;
  payments: PaymentsDTO[] = [] ;

  @ViewChild('medPaginator', {static: true}) medPaginator: MatPaginator;
  @ViewChild('medSort', {static: true}) medSort: MatSort;

  @ViewChild('paymentPaginator', {static: true}) paymentPaginator: MatPaginator;
  @ViewChild('paymentSort', {static: true}) paymentSort: MatSort;

  isLoading: boolean;

  constructor(private medicineService: MedicineService, private paymentService: PaymentService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllMedicine();
    this.getAllPayments();
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

  getAllPayments() {
    this.isLoading = true;
    this.paymentService.getAll().subscribe( value => {
      // @ts-ignore
      if (value.success) {
        this.payments = value.body;
        // Assign the data to the data source for the table to render
        this.paymentDataSource = new MatTableDataSource(this.payments);
        this.paymentDataSource.paginator = this.paymentPaginator;
        this.paymentDataSource.sort = this.paymentSort;

        this.paymentDataSource.sortingDataAccessor = (item, property) => {
          if (property === 'patient') {
            return item.patient.name;
          } else {
            return item[property];
          }
        };
        this.paymentDataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if (key === 'patient') {
              return currentTerm + data.patient.name;
            }  else {
              return currentTerm + data[key];
            }
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

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

  applyPaymentFilter(filterValue: string) {
    this.paymentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.paymentDataSource.paginator) {
      this.paymentDataSource.paginator.firstPage();
    }
  }

  addNewPayment() {
    // this.paymentService.setPayment(undefined);
    // this.paymentService.setIsUpdate(false);
    this.openAddPaymentDialog();
  }

  paymentTblDeleteClick(row: any) {
  }

  paymentTblEditClick(row: any) {
    // this.paymentService.setPayment(row);
    // this.paymentService.setIsUpdate(true);
    this.openAddPaymentDialog();
  }

  private openAddMedDialog() {
    this.dialog.open(SaveMedicineComponent).afterClosed().subscribe(value => {
      this.medicineService.setMedicine(undefined);
      this.getAllMedicine();
    });
  }
  private openAddPaymentDialog() {
    // this.dialog.open(SavePaymentComponent).afterClosed().subscribe(value => {
    //   this.paymentService.setPayment(undefined);
    //   this.getAllPayments();
    // });
  }

}
