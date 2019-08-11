import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../../services/doctor.service';
import {HospitalService} from '../../../services/hospital.service';
import {SpecialityService} from '../../../services/speciality.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {DaysService} from '../../../services/days.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-savemodal',
  templateUrl: './savemodal.component.html',
  styleUrls: ['./savemodal.component.scss']
})
export class SavemodalComponent implements OnInit {
  private hospital: HospitalDTO ;
  private speciality: SpecialityDTO ;
  private name: string;
  private address: string;
  private tel: string;

  private isMonday = false;
  private isTuesday = false;
  private isWednesday = false;
  private isThursday = false;
  private isFriday = false;
  private isSaturday = false;
  private isSunday = false;

  private monfrom = '00:00';
  private monto = '00:00';
  private tuefrom = '00:00';
  private tueto = '00:00';
  private wedfrom = '00:00';
  private wedto = '00:00';
  private thursfrom = '00:00';
  private thursto = '00:00';
  private frifrom = '00:00';
  private frito = '00:00';
  private satfrom = '00:00';
  private satto = '00:00';
  private sunfrom = '00:00';
  private sunto = '00:00';
  private username: string = null;
  private password: string = null;

  private myControlHospital = new FormControl();
  private hospitals: HospitalDTO[] = [];
  private filteredHospitals: Observable<HospitalDTO[]>;

  private myControlSpeciality = new FormControl();
  private specialities: SpecialityDTO[] = [];
  private filteredSpecialities: Observable<SpecialityDTO[]>;

  private days: DaysDTO[] = [];

  constructor(private doctorService: DoctorService, private hospitalService: HospitalService,
            private specialityService: SpecialityService, private daysService: DaysService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllHospitals();
    this.getAllSpecialities();
    this.getAllDays();
  }

  displayFnHospital(hospital?: HospitalDTO): string | undefined {
    return hospital ? hospital.hospitalName : undefined;
  }

  displayFnSpeciality(speciality?: SpecialityDTO): string | undefined {
    return speciality ? speciality.specialityName : undefined;
  }

  private _filterHospital(name: string): HospitalDTO[] {
    const filterValue = name.toLowerCase();
    return this.hospitals.filter(option => option.hospitalName.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterSpeciality(name: string): SpecialityDTO[] {
    const filterValue = name.toLowerCase();
    return this.specialities.filter(option => option.specialityName.toLowerCase().indexOf(filterValue) === 0);
  }

  getAllHospitals () {
    this.hospitalService.getAll().subscribe(value => {
      this.hospitals = value.body;
      this.filteredHospitals = this.myControlHospital.valueChanges
          .pipe(
              startWith(''),
              map(hospital => typeof hospital === 'string' ? hospital : hospital.name),
              map(name => name ? this._filterHospital(name) : this.hospitals.slice())
          );
    }, error => {
      console.log(error);
    } )
  }
  getAllSpecialities () {
    this.specialityService.getAll().subscribe(value => {
      this.specialities = value.body;
      this.filteredSpecialities = this.myControlSpeciality.valueChanges
          .pipe(
              startWith(''),
              map(speciality => typeof speciality === 'string' ? speciality : speciality.name),
              map(name => name ? this._filterSpeciality(name) : this.specialities.slice())
          );
    }, error => {
      console.log(error);
    } )
  }

  private getAllDays() {
    this.daysService.getAll().subscribe(value => {
      this.days = value.body;
    }, error => {
      console.log(error);
    } );
  }

  setHospital(hospital) {
    this.hospital = hospital;
  }
  setSpeciality(speciality) {
    this.speciality = speciality;
  }

  saveDoctor() {
    const docDays = [];
    if (this.isMonday) {
      docDays.push({
        dayId: this.days[0].dayId,
        day: this.days[0].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isTuesday) {
      docDays.push({
        dayId: this.days[1].dayId,
        day: this.days[1].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isWednesday) {
      docDays.push({
        dayId: this.days[2].dayId,
        day: this.days[2].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isThursday) {
      docDays.push({
        dayId: this.days[3].dayId,
        day: this.days[3].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isFriday) {
      docDays.push({
        dayId: this.days[4].dayId,
        day: this.days[4].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isSaturday) {
      docDays.push({
        dayId: this.days[5].dayId,
        day: this.days[5].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }
    if (this.isSunday) {
      docDays.push({
        dayId: this.days[6].dayId,
        day: this.days[6].day,
        from: this.monfrom + ':00',
        to: this.monto + ':00',
      });
    }

    const doctor = {
      doctorId: 0,
      name: 'Dr. ' + this.name,
      address: this.address,
      tel: this.tel,
      speciality: this.speciality,
      hospital: this.hospital,
      daysDTOs: docDays,
      adminDTO: {
        userName: this.username,
        password: this.password
      }
    };
    this.doctorService.save(doctor).subscribe(value => {
      console.log(value);
      if (value.success) {
        alert('Success');
        this.dialog.closeAll();
      } else {
        alert('Error');
      }
    }, error => {
      alert('Server Error');
      console.log(error);
    });
  }

}
