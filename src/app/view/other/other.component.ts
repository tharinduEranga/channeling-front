import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HospitalService} from '../../services/hospital.service';
import {SpecialityService} from '../../services/speciality.service';
import Swal from 'sweetalert2';
import {SaveComponent} from './save/save.component';
import {OtherService} from '../../services/other.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss']
})
export class OtherComponent implements OnInit {

  columnsOfHospitals: string[] = ['hospitalId', 'hospitalName', 'actions'];
  columnsOfSpecialities: string[] = ['specialityId', 'specialityName', 'actions'];

  hospDataSource: MatTableDataSource<HospitalDTO>;
  speciDataSource: MatTableDataSource<SpecialityDTO>;

  hospitals: HospitalDTO[] = [] ;
  specialities: SpecialityDTO[] = [] ;

  @ViewChild('hospPaginator', {static: true}) hospPaginator: MatPaginator;
  @ViewChild('hospSort', {static: true}) hospSort: MatSort;

  @ViewChild('specPaginator', {static: true}) specPaginator: MatPaginator;
  @ViewChild('specSort', {static: true}) specSort: MatSort;

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  isLoading: boolean;

  constructor(private hospitalService: HospitalService, private specialityService: SpecialityService,
              private dialog: MatDialog, private otherService: OtherService) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllHospitals();
    this.getAllSpecialities();
  }

  applyHospFilter(filterValue: string) {
    this.hospDataSource.filter = filterValue.trim().toLowerCase();
    if (this.hospDataSource.paginator) {
      this.hospDataSource.paginator.firstPage();
    }
  }
  applySpecFilter(filterValue: string) {
    this.speciDataSource.filter = filterValue.trim().toLowerCase();
    if (this.speciDataSource.paginator) {
      this.speciDataSource.paginator.firstPage();
    }
  }

  private getAllHospitals() {
    this.hospitalService.getAll().subscribe(value => {
      if (value.success) {
        this.hospitals = value.body;
        this.hospDataSource = new MatTableDataSource(this.hospitals);
        this.hospDataSource.paginator = this.hospPaginator;
        this.hospDataSource.sort = this.hospSort;
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }
      this.isLoading = false;
    });
  }

  private getAllSpecialities() {
    this.specialityService.getAll().subscribe(value => {
      if (value.success) {
        this.specialities = value.body;
        this.speciDataSource = new MatTableDataSource(this.specialities);
        this.speciDataSource.paginator = this.specPaginator;
        this.speciDataSource.sort = this.specSort;
      } else {
        Swal.fire('Error occured!', value.message, 'error');
      }
      this.isLoading = false;
    });
  }

  hospTblEditClick(row: any) {
    Swal.fire('Table click!', 'Edit hospital', 'success');
  }

  hospTblDeleteClick(row: any) {
    Swal.fire('Table click!', 'delete hospital', 'success');
  }

  specTblEditClick(row: any) {
    Swal.fire('Table click!', 'Edit Spec', 'success');
  }

  specTblDeleteClick(row: any) {
    Swal.fire('Table click!', 'delete Spec', 'success');
  }

  addNewHospital() {
    this.otherService.setIsHospital(true);
    this.openDialog();
  }

  private openDialog() {
    this.dialog.open(SaveComponent).afterClosed().subscribe(value => {
      if (this.otherService.getIsHospital()) {
        this.getAllHospitals();
      } else {
        this.getAllSpecialities();
      }
    });
  }

  addNewSpeciality() {
    this.otherService.setIsHospital(false);
    this.openDialog();
  }

}
