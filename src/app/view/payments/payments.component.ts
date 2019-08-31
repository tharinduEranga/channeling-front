import {Component, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../../services/payment.service';
import Swal from 'sweetalert2';
import {MatDialog, MatOptionSelectionChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MedicineDTO} from '../../dto/medicineDTO';
import {MedicineService} from '../../services/medicine.service';
import {SaveMedicineComponent} from '../medicine/save-medicine/save-medicine.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PatientService} from '../../services/patient.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payment = {
    paymentId: 0,
    amount: 0,
    patient: {
      patientId: 0
    },
    paymentMedDTOS: [{
      medicineId: 0,
      qty: 0,
      amount: 0
    }]
  };

  medicineColumns: string[] = ['medicineName', 'price', 'qty', 'brand', 'medicineAction'];
  paymentColumns: string[] = ['paymentId', 'date', 'amount', 'patient'];

  medDataSource: MatTableDataSource<MedicineDTO>;
  paymentDataSource: MatTableDataSource<PaymentsDTO>;

  medicine: MedicineDTO[] = [] ;
  payments: PaymentsDTO[] = [] ;

  payMedDetails = [];

  selectedMedicine = {
    medicineId: 0,
    qty: 0,
    amount: 0
  };

  @ViewChild('medPaginator', {static: true}) medPaginator: MatPaginator;
  @ViewChild('medSort', {static: true}) medSort: MatSort;

  @ViewChild('paymentPaginator', {static: true}) paymentPaginator: MatPaginator;
  @ViewChild('paymentSort', {static: true}) paymentSort: MatSort;

  isLoading: boolean;

  private _patientArray: PatientDTO[] = [];
  myControlPatient = new FormControl();
  filteredPatients: Observable<PatientDTO[]>;

  constructor(private medicineService: MedicineService, private paymentService: PaymentService,
              private patientService: PatientService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllMedicine();
    // this.getAllPayments();
    this.getAllPatients();
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

  medicineSelected(row: any) {
    this.selectedMedicine = row;
    this.selectedMedicine.amount = row.price;
  }

  displayFnPatient(patient ?: PatientDTO): string | undefined {
    return patient ? patient.name : undefined;
  }

  private _filterPatient(name: string): PatientDTO[] {
    const filterValue = name.toLowerCase();
    return this._patientArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private getAllPatients() {
    this.isLoading = true;
    this.patientService.getAll().subscribe(value => {
      if (value.success) {
        this._patientArray = value.body;
        this.filteredPatients = this.myControlPatient.valueChanges
            .pipe(
                startWith(''),
                map(patient => typeof patient === 'string' ? patient : patient.name),
                map(name => name ? this._filterPatient(name) : this._patientArray.slice())
            );
        this.isLoading = false;
        this.myControlPatient.valueChanges.subscribe( values  => {
          if (!this.myControlPatient.value) {
            this.payment.patient = {
              patientId: 0
            };
          }
        });
      }
    });
  }

  setPatient($event: MatOptionSelectionChange, patient: PatientDTO) {
    this.payment.patient = patient;
  }

  addPayMedDetail() {
    this.payMedDetails.push(this.selectedMedicine);
  }

  addNewPayment() {
    // this.paymentService.setPayment(undefined);
    // this.paymentService.setIsUpdate(false);
    this.payment.paymentMedDTOS = this.payMedDetails;
    console.log(this.payment);
    this.openAddPaymentDialog();
  }
}
