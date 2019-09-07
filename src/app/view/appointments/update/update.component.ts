import { Component, OnInit } from '@angular/core';
import {AppointmentsService} from '../../../services/appointments.service';
import {MatDialog, MatOptionSelectionChange} from '@angular/material';
import Swal from 'sweetalert2';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PatientService} from '../../../services/patient.service';
import {DoctorService} from '../../../services/doctor.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  private appointmentsObject = {
    appointmentId: 0,
    date: null,
    token_no: 0,
    issue: null,
    patient: {
      patientId: 0,
      name: null
    },
    doctor: {
      doctorId: 0,
      name: null
    }
  };

  doctor = {
    doctorId: 0,
  };

  patient = {
    patientId: 0,
    name: null,
    age: null,
    tel: null,
    address: null
  };

  patientArray: PatientDTO[] = [];
  myControlPatient = new FormControl();
  filteredPatients: Observable<PatientDTO[]>;

  doctorArray: DoctorDTO[] = [];
  myControlDoctor = new FormControl();
  filteredDoctors: Observable<DoctorDTO[]>;

  constructor(private appointmentsService: AppointmentsService, private patientService: PatientService,
              private doctorService: DoctorService, private dialog: MatDialog) { }

  ngOnInit() {
    this.setAppointments();
    this.getAllPatients();
    this.getAllDoctors();
  }

  saveData() {
    this.appointmentsService.update(this.appointmentsObject).subscribe(value => {
      if (value.success) {
        Swal.fire('Done!', 'Appointments is Updated!', 'success');
        this.dialog.closeAll();
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }

  private setAppointments() {
    this.appointmentsObject = JSON.parse(JSON.stringify(this.appointmentsService.getAppointment()));
    this.myControlDoctor.setValue(this.appointmentsObject.doctor.name);
    this.myControlPatient.setValue(this.appointmentsObject.patient.name);
    console.log(this.myControlDoctor.value);
  }

  displayFnPatient(patient ?: PatientDTO): string | undefined {
    return patient ? patient.name : undefined;
  }

  displayFnDoctor(doctor ?: DoctorDTO): string | undefined {
    return doctor ? doctor.name : undefined;
  }

  private _filterPatient(name: string): PatientDTO[] {
    const filterValue = name.toLowerCase();
    return this.patientArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterDoctor(name: string): DoctorDTO[] {
    const filterValue = name.toLowerCase();
    return this.doctorArray.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  setPatient(event: MatOptionSelectionChange, patient: PatientDTO) {
    if (event.source.selected) {
      this.patient = patient;
      this.appointmentsObject.patient = patient;
    }
  }

  setDoctor(event: MatOptionSelectionChange, doctor: DoctorDTO) {
    if (event.source.selected) {
      this.doctor = doctor;
      this.appointmentsObject.doctor = doctor;
    }
  }

  private getAllPatients() {
    this.patientService.getAll().subscribe(value => {
      if (value.success) {
        this.patientArray = value.body;
        this.filteredPatients = this.myControlPatient.valueChanges
            .pipe(
                startWith(''),
                map(patient => typeof patient === 'string' ? patient : patient.name),
                map(name => name ? this._filterPatient(name) : this.patientArray.slice())
            );
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
    this.doctorService.getAll().subscribe(value => {
      if (value.success) {
        this.doctorArray = value.body;
        this.filteredDoctors = this.myControlDoctor.valueChanges
            .pipe(
                startWith(''),
                map(doctor => typeof doctor === 'string' ? doctor : doctor.name),
                map(name => name ? this._filterDoctor(name) : this.doctorArray.slice())
            );
      }
    });
  }

  setDate(event) {
    this.appointmentsObject.date = event.targetElement.value;
  }
}
