import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'tel', 'hospital', 'speciality', 'actions'];
  dataSource: MatTableDataSource<AppointmentsDTO>;

  appointments: AppointmentsDTO[] = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoading: boolean;

  constructor() { }

  ngOnInit() {
  }

  addNewClick() {
    Swal.fire('Click', 'add new', 'success');
  }
}
