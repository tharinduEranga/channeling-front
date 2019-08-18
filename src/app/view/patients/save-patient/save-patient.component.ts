import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient.service';
import {MatDialog} from '@angular/material';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-save-patient',
    templateUrl: './save-patient.component.html',
    styleUrls: ['./save-patient.component.scss']
})
export class SavePatientComponent implements OnInit {

    patient = {
        patientId: 0,
        name: null,
        age: null,
        tel: null,
        address: null
    };

    constructor(private patientService: PatientService, private dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.patientService.getIsUpdate()) {
            this.patient = JSON.parse(JSON.stringify(this.patientService.getPatient()));
        }
    }

    saveData() {
        if (this.patientService.getIsUpdate()) {
            this.patientService.update(this.patient).subscribe(value => {
                if (value.success) {
                    Swal.fire('Done!', 'Patient is Updated!', 'success');
                    this.dialog.closeAll();
                } else {
                    Swal.fire('Failed!', value.message, 'error');
                }
            })
        } else {
            this.patientService.save(this.patient).subscribe(value => {
                if (value.success) {
                    Swal.fire('Done!', 'Patient is Added!', 'success');
                    this.dialog.closeAll();
                } else {
                    Swal.fire('Failed!', value.message, 'error');
                }
            })
        }
    }
}
