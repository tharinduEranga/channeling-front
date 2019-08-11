import { Component, OnInit } from '@angular/core';
import {DoctorService} from '../../../services/doctor.service';
import {HospitalService} from '../../../services/hospital.service';
import {SpecialityService} from '../../../services/speciality.service';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-savemodal',
  templateUrl: './savemodal.component.html',
  styleUrls: ['./savemodal.component.scss']
})
export class SavemodalComponent implements OnInit {
  private specialities: SpecialityDTO[] = [];
  private hospitals: HospitalDTO[] = [];
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
  constructor(private doctorService: DoctorService, private hospitalService: HospitalService, private specialityService: SpecialityService) {
  }

  ngOnInit() {
    this.getAllHospitals();
    this.getAllSpecialities();
  }

  getAllHospitals () {
    this.hospitalService.getAll().subscribe(value => {
      this.hospitals = value.body;
    }, error => {
      console.log(error);
    } )
  }
  getAllSpecialities () {
    this.specialityService.getAll().subscribe(value => {
      this.specialities = value.body;
    }, error => {
      console.log(error);
    } )
  }

  setHospital(hospital) {
    this.hospital = hospital;
    console.log(hospital);
  }
  setSpeciality() {
    console.log(this.speciality);
  }
}
