import { Component, OnInit } from '@angular/core';
import {Roles} from '../../sidebar/sidebar.component';
import {AdminsService} from '../../services/admins.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  isLoading: boolean;
  admin = {
    adminId: 0,
    userName: null,
    password: null,
    roles: ''
  };
  userNameReadOnly: boolean;
  passwordReadOnly: boolean;
  roles: string[] = [];

  constructor(private adminService: AdminsService) { }

  ngOnInit() {
    for (const rolesKey in Roles) {
      this.roles.push(rolesKey);
    }
  }

  setRole(role) {
    console.log(role);
    this.admin.roles = role;
  }

  saveAdmin() {
    this.adminService.save(this.admin).subscribe(value => {
      if (value.success) {
        Swal.fire('Done!', 'Admin is added!', 'success');
      } else {
        Swal.fire('Failed!', value.message, 'error');
      }
    });
  }
}
