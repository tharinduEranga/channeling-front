// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const adminDTO = {
      userName: this.userName,
      password: this.password
    };
    this.authService.loginAdmin(adminDTO).subscribe(value => {
      console.log(adminDTO);
      console.log(value);
      if (value.success) {
        this.router.navigateByUrl('/');
      } else {
        Swal.fire('Error', value.message, 'warning');
      }
    });
  }

}
