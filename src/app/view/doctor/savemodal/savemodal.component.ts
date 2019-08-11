import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../../services/doctor.service';
import {HospitalService} from '../../../services/hospital.service';
import {SpecialityService} from '../../../services/speciality.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
  // "speciality":{
  //   "specialityId":20,
  //   "specialityName":"Neuro Surgeon"
  // },
  // "hospital":{
  //   "hospitalId":21,
  //   "hospitalName":"Asiri Hospitals Colombo"
  // },
  // "daysDTOs":[
  //     {
  //       "dayId":12,
  //       "day":"",
  //       "from":"15:30:00",
  //       "to":"18:50:00"
  //     },
  //     {
  //       "dayId":13,
  //       "day":"",
  //       "from":"14:00:00",
  //       "to":"15:30:00"
  //     }
  //     ],
  // "adminDTO":{
  //   "userName":"thar",
  //   "password":123
  // }

  myControlHospital = new FormControl();
  private hospitals: HospitalDTO[] = [];
  filteredHospitals: Observable<HospitalDTO[]>;

  myControlSpeciality = new FormControl();
  private specialities: SpecialityDTO[] = [];
  filteredSpecialities: Observable<SpecialityDTO[]>;

  constructor(private doctorService: DoctorService, private hospitalService: HospitalService, private specialityService: SpecialityService) {
  }
  ngOnInit() {
    this.getAllHospitals();
    this.getAllSpecialities();
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

  setHospital(hospital) {
    console.log(hospital);
  }
  setSpeciality(speciality) {
    console.log(speciality);
  }
}
