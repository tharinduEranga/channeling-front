import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

import {DoctorService} from '../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['doctorId', 'name', 'address', 'tel'];
  dataSource: MatTableDataSource<DoctorDTO>;

  doctors: DoctorDTO[] = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe( value => {
      // @ts-ignore
      this.doctors = value.body;
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.doctors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
