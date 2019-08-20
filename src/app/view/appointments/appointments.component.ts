import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {PatientService} from '../../services/patient.service';
import {DoctorService} from '../../services/doctor.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'tel', 'hospital', 'speciality', 'actions'];
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

  constructor(private patientService: PatientService, private doctorService: DoctorService) { }

  ngOnInit() {
    this.getAllPatients();
    this.getAllDoctors();
  }

  displayFnPatient(patient ?: PatientDTO): string | undefined {
    return patient ? patient.name : undefined;
  }
  displayFnDoctor(doctor ?: DoctorDTO): string | undefined {
    return doctor ? doctor.name : undefined;
  }

  setPatient(patient: PatientDTO) {
    console.log(patient);
    this.patient = patient;
  }
  setDoctor(doctor: DoctorDTO) {
    this.doctor = doctor;
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
    Swal.fire('Click', 'add new', 'success');
  }


}
