import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PatientService} from '../../services/patient.service';
import Swal from 'sweetalert2';
import {SavePatientComponent} from './save-patient/save-patient.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  columnsOfPatients: string[] = ['name', 'age', 'tel', 'address', 'actions'];

  patientDataSource: MatTableDataSource<PatientDTO>;

  patients: PatientDTO[] = [] ;

  @ViewChild('patientPaginator', {static: true}) patientPaginator: MatPaginator;

  @ViewChild('patientSort', {static: true}) patientSort: MatSort;

  isLoading = true;

  constructor(private patientService: PatientService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllPatients();
  }

  patientTblDeleteClick(row) {
    const patientId = row.patientId;

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
        this.patientService.delete(patientId).subscribe(value => {
          if (value.success) {
            this.getAllPatients();
            Swal.fire('Done!', 'Patient is Deleted!', 'success');
          } else {
            Swal.fire('Failed!', value.message, 'error');
          }
        })
      }
    })
  }

  patientTblEditClick(row) {
    this.patientService.setPatient(row);
    this.patientService.setIsUpdate(true);
    this.openAddPatientDialog();
  }

  applyPatientFilter(filterValue: string) {
    this.patientDataSource.filter = filterValue.trim().toLowerCase();
    if (this.patientDataSource.paginator) {
      this.patientDataSource.paginator.firstPage();
    }
  }

  private getAllPatients() {
    this.isLoading = true;
    this.patientService.getAll().subscribe(value => {
      if (value.success) {
        this.patients = value.body;
        this.patientDataSource = new MatTableDataSource(this.patients);
        this.patientDataSource.paginator = this.patientPaginator;
        this.patientDataSource.sort = this.patientSort;
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }
      this.isLoading = false;
    });
  }

  addNewPatients() {
    this.patientService.setPatient(undefined);
    this.patientService.setIsUpdate(false);
    this.openAddPatientDialog();
  }

  private openAddPatientDialog() {
    this.dialog.open(SavePatientComponent).afterClosed().subscribe(value => {
      this.getAllPatients();
    });
  }

}
