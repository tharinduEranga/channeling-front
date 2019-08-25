import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatDatepickerInputEvent, MatOptionSelectionChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {map, startWith} from 'rxjs/operators';
import {AppointmentsService} from '../../services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  private appointment = {
    appointmentId: 0,
    date: null,
    token_no: 0,
    issue: null,
    patient: {
      patientId: 37,
      name: null
    },
    doctor: {
      doctorId: 14,
      name: null
    }
  };

  displayedColumns: string[] = ['date', 'token_no', 'issue', 'patient', 'doctor', 'actions'];
  dataSource: MatTableDataSource<AppointmentsDTO>;

  appointments: AppointmentsDTO[] = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading: boolean;

  private patient = {
    patientId: 0,
    name: null,
    age: null,
    tel: null,
    address: null
  };
  private patientArray: PatientDTO[] = [];
  private myControlPatient = new FormControl();
  private filteredPatients: Observable<PatientDTO[]>;

  private doctor = {
    doctorId: 0,
  };
  private doctorArray: DoctorDTO[] = [];
  private myControlDoctor = new FormControl();
  private filteredDoctors: Observable<DoctorDTO[]>;

  constructor(private patientService: PatientService, private doctorService: DoctorService,
              private appointmentsService: AppointmentsService) { }

  ngOnInit() {
    this.getAllPatients();
    this.getAllDoctors();
    this.getAllAppointMents();
  }

  displayFnPatient(patient ?: PatientDTO): string | undefined {
    return patient ? patient.name : undefined;
  }
  displayFnDoctor(doctor ?: DoctorDTO): string | undefined {
    return doctor ? doctor.name : undefined;
  }

  setPatient(event: MatOptionSelectionChange, patient: PatientDTO) {
    if (event.source.selected) {
      this.patient = patient;
      this.appointment.patient = patient;
    }
  }

  setDoctor(event: MatOptionSelectionChange, doctor: DoctorDTO) {
    if (event.source.selected) {
      this.doctor = doctor;
      this.appointment.doctor = doctor;
    }
  }

  private getAllPatients() {
    this.isLoading = true;
    this.patientService.getAll().subscribe(value => {
      if (value.success) {
        this.patientArray = value.body;
        this.filteredPatients = this.myControlPatient.valueChanges
            .pipe(
                startWith(''),
                map(patient => typeof patient === 'string' ? patient : patient.name),
                map(name => name ? this._filterPatient(name) : this.patientArray.slice())
            );
        this.isLoading = false;
        this.myControlPatient.valueChanges.subscribe( values  => {
            if (!this.myControlPatient.value) {
              this.patient = {
                patientId: 0,
                name: null,
                age: null,
                tel: null,
                address: null
              };
            }
        });
      }
    });
  }
  private getAllDoctors() {
    this.isLoading = true;
    this.doctorService.getAll().subscribe(value => {
      if (value.success) {
        this.doctorArray = value.body;
        this.filteredDoctors = this.myControlDoctor.valueChanges
            .pipe(
                startWith(''),
                map(doctor => typeof doctor === 'string' ? doctor : doctor.name),
                map(name => name ? this._filterDoctor(name) : this.doctorArray.slice())
            );
        this.isLoading = false;
      }
    });
  }

  private _filterPatient(name: string): PatientDTO[] {
    const filterValue = name.toLowerCase();
    return this.patientArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDoctor(name: string): DoctorDTO[] {
    const filterValue = name.toLowerCase();
    return this.doctorArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  addNewClick() {
    console.log(this.appointment);
    this.appointmentsService.save(this.appointment).subscribe(value => {
      if (value.success) {
        Swal.fire('Appointment is Added!', 'Token no: ' + value.body.token_no, 'success');
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }


  tableClick(row) {

  }

  tableDelete(row) {
  }

  applyFilter(value: string) {
  }

  private getAllAppointMents() {
    this.isLoading = true;
    this.appointmentsService.getAll().subscribe( value => {
      if (value.success) {
        // @ts-ignore
        this.appointments = value.body;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.appointments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (item, property) => {
          if (property === 'patient') {
            return item.patient.name;
          } else {
            return item[property];
          }
        };
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            if (key === 'patient') {
              return currentTerm + data.patient.name;
            } else {
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

  setDate(event) {
    this.appointment.date = event.targetElement.value;
  }
}
