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

  loginButtonDisable = false;

  constructor(private authService: AuthService, private router: Router) {
      this.authService.isLogged = false;
  }

  ngOnInit() {
  }

  login() {
      const adminDTO = {
          userName: this.userName,
          password: this.password
      };
      this.authService.loginAdmin(adminDTO).subscribe(value => {
          this.loginButtonDisable = true;
          if (value.success) {
              this.authService.isLogged = true;
              this.router.navigateByUrl('/');
          } else {
              this.authService.isLogged = false;
              Swal.fire('Error', value.message, 'warning');
          }
          this.loginButtonDisable = false;
      });
  }

}
