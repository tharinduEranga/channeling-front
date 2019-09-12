import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MatOptionSelectionChange, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {map, startWith} from 'rxjs/operators';
import {AppointmentsService} from '../../services/appointments.service';
import {UpdateComponent} from './update/update.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  private _appointment = {
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

  private _displayedAppointColumns: string[] = ['date', 'token_no', 'issue', 'patient', 'doctor', 'actions'];
  private _appointment_dataSource: MatTableDataSource<AppointmentsDTO>;

  private _appointments: AppointmentsDTO[] = [] ;
  @ViewChild('appointPaginator', {static: true}) appointPaginator: MatPaginator;
  @ViewChild('appointSort', {static: true}) appointSort: MatSort;

  isLoading: boolean;

  patient = {
    patientId: 0,
    name: null,
    age: null,
    tel: null,
    address: null
  };
  private _patientArray: PatientDTO[] = [];
  myControlPatient = new FormControl();
  filteredPatients: Observable<PatientDTO[]>;

  private doctor = {
    doctorId: 0,
  };
  private _doctorArray: DoctorDTO[] = [];
  myControlDoctor = new FormControl();
  filteredDoctors: Observable<DoctorDTO[]>;

  constructor(private patientService: PatientService, private doctorService: DoctorService,
              private appointmentsService: AppointmentsService, private dialog: MatDialog) { }

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
      this._appointment.patient = patient;
    }
  }

  setDoctor(event: MatOptionSelectionChange, doctor: DoctorDTO) {
    if (event.source.selected) {
      this.doctor = doctor;
      this._appointment.doctor = doctor;
    }
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
        this._doctorArray = value.body;
        this.filteredDoctors = this.myControlDoctor.valueChanges
            .pipe(
                startWith(''),
                map(doctor => typeof doctor === 'string' ? doctor : doctor.name),
                map(name => name ? this._filterDoctor(name) : this._doctorArray.slice())
            );
        this.isLoading = false;
      }
    });
  }

  private _filterPatient(name: string): PatientDTO[] {
    const filterValue = name.toLowerCase();
    return this._patientArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDoctor(name: string): DoctorDTO[] {
    const filterValue = name.toLowerCase();
    return this._doctorArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }


  addNewClick() {
    console.log(this._appointment);
    this.appointmentsService.save(this._appointment).subscribe(value => {
      if (value.success) {
        this.getAllAppointMents();
        Swal.fire('Appointment is Added!', 'Token no: ' + value.body.token_no, 'success');
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }


  appointTableClick(row) {
    this.appointmentsService.setAppointment(row);
    this.openAddAppointmentDialog();
  }

  appointTableDelete(row) {
    const appointmentId = row.appointmentId;

    Swal.fire({
      title : 'Are you sure?' ,
      text : 'You won\'t be able to revert this!' ,
      type : 'warning',
      showCancelButton : true,
      confirmButtonColor: '#3085d6' ,
      cancelButtonColor : '#d33' ,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.appointmentsService.delete(appointmentId).subscribe(value => {
          if (value.success) {
            this.getAllAppointMents();
            Swal.fire('Done!', 'Appointment is Deleted!', 'success');
          } else {
            Swal.fire('Failed!', value.message, 'error');
          }
        })
      }
    })
  }

  applyAppointmentFilter(filterValue: string) {
    this.appointment_dataSource.filter = filterValue.trim().toLowerCase();
    if (this.appointment_dataSource.paginator) {
      this.appointment_dataSource.paginator.firstPage();
    }
  }

  private getAllAppointMents() {
    this.isLoading = true;
    this.appointmentsService.getFutureAppointments().subscribe( value => {
      if (value.success) {
        // @ts-ignore
        this._appointments = value.body;
        // Assign the data to the data source for the table to render
        this._appointment_dataSource = new MatTableDataSource(this._appointments);
        this._appointment_dataSource.paginator = this.appointPaginator;
        this._appointment_dataSource.sort = this.appointSort;
        this._appointment_dataSource.sortingDataAccessor = (item, property) => {
          if (property === 'patient') {
            return item.patient.name;
          } else if (property === 'doctor') {
            return item.doctor.name;
          } else {
            return item[property];
          }
        };
        this._appointment_dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            if (key === 'patient') {
              return currentTerm + data.patient.name;
            } else if (key === 'doctor') {
              return currentTerm + data.doctor.name;
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
    this._appointment.date = event.targetElement.value;
  }

  private openAddAppointmentDialog() {
    this.dialog.open(UpdateComponent).afterClosed().subscribe(value => {
      this.getAllAppointMents();
    });
  }

  // =====================Getters and Setters==============================
  get appointment(): {
    date: null; doctor: { doctorId: number; name: null };
    token_no: number; issue: null; appointmentId: number;
    patient: { patientId: number; name: null }
  } {
    return this._appointment;
  }

  set appointment(value: { date: null;
  doctor: { doctorId: number; name: null };
  token_no: number; issue: null; appointmentId: number;
  patient: { patientId: number; name: null } }) {
    this._appointment = value;
  }

  get displayedAppointColumns(): string[] {
    return this._displayedAppointColumns;
  }

  set displayedAppointColumns(value: string[]) {
    this._displayedAppointColumns = value;
  }

  get appointment_dataSource(): MatTableDataSource<AppointmentsDTO> {
    return this._appointment_dataSource;
  }

  set appointment_dataSource(value: MatTableDataSource<AppointmentsDTO>) {
    this._appointment_dataSource = value;
  }

  get appointments(): AppointmentsDTO[] {
    return this._appointments;
  }

  set appointments(value: AppointmentsDTO[]) {
    this._appointments = value;
  }

  get patientArray(): PatientDTO[] {
    return this._patientArray;
  }

  set patientArray(value: PatientDTO[]) {
    this._patientArray = value;
  }

  get doctorArray(): DoctorDTO[] {
    return this._doctorArray;
  }

  set doctorArray(value: DoctorDTO[]) {
    this._doctorArray = value;
  }
  // =====================End of Getters and Setters==============================

}
