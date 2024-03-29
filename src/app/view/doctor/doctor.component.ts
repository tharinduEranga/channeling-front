import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';

import {DoctorService} from '../../services/doctor.service';
import {SavemodalComponent} from './savemodal/savemodal.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'tel', 'hospital', 'speciality', 'actions'];
  dataSource: MatTableDataSource<DoctorDTO>;

  doctors: DoctorDTO[] = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading: boolean;

  constructor(private doctorService: DoctorService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllDoctors();
  }

  public getAllDoctors() {
    this.isLoading = true;
    this.doctorService.getAll().subscribe( value => {
      // @ts-ignore
      this.doctors = value.body;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        if (property === 'speciality') {
          return item.speciality.specialityName;
        } else if (property === 'hospital') {
          return item.hospital.hospitalName;
        } else {
          return item[property];
        }
      };
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          if (key === 'speciality') {
            return currentTerm + data.speciality.specialityName;
          } else if (key === 'hospital') {
            return currentTerm + data.hospital.hospitalName;
          } else {
            return currentTerm + data[key];
          }
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  tableClick (row) {
    this.doctorService.setdoctor(row);
    this.doctorService.setIsUpdate(true);
    this.openDialog();
  }
  addNewClick () {
    this.doctorService.setIsUpdate(false);
    this.openDialog();
  }
  openDialog() {
    this.dialog.open(SavemodalComponent).afterClosed().subscribe(value => {
      this.doctorService.setdoctor(undefined);
      this.getAllDoctors();
    });
  }

  tableDelete(row) {
    const doctorId = row.doctorId;

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
        this.doctorService.delete(doctorId).subscribe(value => {
          if (value.success) {
            this.getAllDoctors();
            Swal.fire('Done!', 'Doctor is Deleted!', 'success');
          } else {
            Swal.fire('Failed!', value.message, 'error');
          }
        })
      }
    })
  }
}
