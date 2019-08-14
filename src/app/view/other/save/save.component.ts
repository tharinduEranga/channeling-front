import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {HospitalService} from '../../../services/hospital.service';
import {SpecialityService} from '../../../services/speciality.service';
import {OtherService} from '../../../services/other.service';

@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.scss']
})
export class SaveComponent implements OnInit {
  private hospital: string;
  private speciality: string;
  private isHospital = true;
  private heading = '';
  constructor(private hospitalService: HospitalService, private specialityService: SpecialityService
      , private otherService: OtherService) { }

  ngOnInit() {
    this.isHospital = this.otherService.getIsHospital();
    if (this.isHospital) {
      this.heading = 'Hospital';
    } else {
      this.heading = 'Speciality';
    }
  }

  saveData() {
    if (this.isHospital) {
      this.saveHospital();
    } else {
      this.saveSpeciality();
    }
  }

  saveHospital() {
    if (this.hospital === '' || this.hospital === null || this.hospital === undefined) {
      Swal.fire('Info', 'Please insert a hospital!', 'warning');
      return;
    }
    this.hospitalService.save({
      hospitalId: 0,
      hospitalName: this.hospital
    }).subscribe(value => {
      if (value.success) {
        Swal.fire('Done', 'Added new hospital!', 'success');
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }
  saveSpeciality() {
    if (this.speciality === '' || this.speciality === null || this.speciality === undefined) {
      Swal.fire('Info', 'Please insert a speciality!', 'warning');
      return;
    }
    this.specialityService.save({
      specialityId: 0,
      specialityName: this.speciality
    }).subscribe(value => {
      if (value.success) {
        Swal.fire('Done', 'Added new speciality!', 'success');
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }
}
