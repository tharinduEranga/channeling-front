import {Component, OnInit} from '@angular/core';
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
    doctor = {
        doctorId: 0,
        name: null,
        address: null,
        tel: null,
        speciality: {
            specialityId: 0,
            specialityName: null
        },
        hospital: {
            hospitalId: 0,
            hospitalName: null
        },
        daysDTOs: [],
        adminDTO: {
            userName: null,
            password: null
        }
    };

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

    private myControlHospital = new FormControl();
    private hospitals: HospitalDTO[] = [];
    private filteredHospitals: Observable<HospitalDTO[]>;

    private myControlSpeciality = new FormControl();
    private specialities: SpecialityDTO[] = [];
    private filteredSpecialities: Observable<SpecialityDTO[]>;

    private days: DaysDTO[] = [];
    userNameReadOnly = true;
    passwordReadOnly = true;

    constructor(private doctorService: DoctorService, private hospitalService: HospitalService,
                private specialityService: SpecialityService, private daysService: DaysService, private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getAllHospitals();
        this.getAllSpecialities();
        this.getAllDays();
        this.setDoctor();
    }

    displayFnHospital(hospital ?: HospitalDTO): string | undefined {
        return hospital ? hospital.hospitalName : undefined;
    }

    displayFnSpeciality(speciality ?: SpecialityDTO): string | undefined {
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

    getAllHospitals() {
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
        })
    }

    getAllSpecialities() {
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
        })
    }

    private getAllDays() {
        this.daysService.getAll().subscribe(value => {
            this.days = value.body;
        }, error => {
            console.log(error);
        });
    }

    setHospital(hospital) {
        this.doctor.hospital = hospital;
    }

    setSpeciality(speciality) {
        this.doctor.speciality = speciality;
    }

    saveDoctor() {
        console.log(this.monfrom + ':00');
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
                from: this.tuefrom + ':00',
                to: this.tueto + ':00',
            });
        }
        if (this.isWednesday) {
            docDays.push({
                dayId: this.days[2].dayId,
                day: this.days[2].day,
                from: this.wedfrom + ':00',
                to: this.wedto + ':00',
            });
        }
        if (this.isThursday) {
            docDays.push({
                dayId: this.days[3].dayId,
                day: this.days[3].day,
                from: this.thursfrom + ':00',
                to: this.thursto + ':00',
            });
        }
        if (this.isFriday) {
            docDays.push({
                dayId: this.days[4].dayId,
                day: this.days[4].day,
                from: this.frifrom + ':00',
                to: this.frito + ':00',
            });
        }
        if (this.isSaturday) {
            docDays.push({
                dayId: this.days[5].dayId,
                day: this.days[5].day,
                from: this.satfrom + ':00',
                to: this.satto + ':00',
            });
        }
        if (this.isSunday) {
            docDays.push({
                dayId: this.days[6].dayId,
                day: this.days[6].day,
                from: this.sunfrom + ':00',
                to: this.sunto + ':00',
            });
        }


        for (let i = 0; i < docDays.length; i++) {
            if (docDays[i].from.split(':').length > 3) {
                docDays[i].from = docDays[i].from.split(':')[0] + ':' + docDays[i].from.split(':')[1] + ':' + docDays[i].from.split(':')[2];
            }
            if (docDays[i].to.split(':').length > 3) {
                docDays[i].to = docDays[i].to.split(':')[0] + ':' + docDays[i].to.split(':')[1] + ':' + docDays[i].to.split(':')[2];
            }
        }

        const doctor = {
            doctorId: this.doctor.doctorId,
            name: 'Dr. ' + this.doctor.name,
            address: this.doctor.address,
            tel: this.doctor.tel,
            speciality: this.doctor.speciality,
            hospital: this.doctor.hospital,
            daysDTOs: docDays,
            adminDTO: {
                userName: this.doctor.adminDTO.userName,
                password: this.doctor.adminDTO.password
            }
        };
        this.doctor.daysDTOs = docDays;

        if (this.doctorService.getIsUpdate()) {
            this.doctorService.update(doctor).subscribe(value => {
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
        } else {
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

    private setDoctor() {
        if (this.doctorService.getDoctor() !== undefined) {
            this.doctor = JSON.parse(JSON.stringify(this.doctorService.getDoctor()));

            // runs following if condition if the adminDto is null as is may cause exceptions in dom
            if (this.doctor.adminDTO === null || this.doctor.adminDTO === undefined) {
                this.doctor.adminDTO = {
                    userName: '',
                    password: ''
                };
            }

            for (let i = 0; i < this.doctor.daysDTOs.length; i++) {
                const day = this.doctor.daysDTOs[i];
                const dayName = day.day;

                if (dayName === 'Monday') {
                    this.isMonday = true;
                    this.monfrom = day.from;
                    this.monto = day.to;
                } else if (dayName === 'Tuesday') {
                    this.isTuesday = true;
                    this.tuefrom = day.from;
                    this.tueto = day.to;
                } else if (dayName === 'Wednesday') {
                    this.isWednesday = true;
                    this.wedfrom = day.from;
                    this.wedto = day.to;
                } else if (dayName === 'Thursday') {
                    this.isThursday = true;
                    this.thursfrom = day.from;
                    this.thursto = day.to;
                } else if (dayName === 'Friday') {
                    this.isFriday = true;
                    this.frifrom = day.from;
                    this.frito = day.to;
                } else if (dayName === 'Saturday') {
                    this.isSaturday = true;
                    this.satfrom = day.from;
                    this.satto = day.to;
                } else if (dayName === 'Sunday') {
                    this.isSunday = true;
                    this.sunfrom = day.from;
                    this.sunto = day.to;
                }
            }
            this.myControlHospital.setValue(this.doctor.hospital);
            this.myControlSpeciality.setValue(this.doctor.speciality);
        }
    }
}
