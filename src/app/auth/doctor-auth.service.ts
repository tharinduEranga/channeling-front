import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {Roles} from '../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorAuthService implements CanActivate {
  private userData: AdminDTO;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
      | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userData = this.authService.userData;
    try {
      if (this.userData.roles === Roles.RECEPTION || this.userData.roles === Roles.ADMIN || this.userData.roles === Roles.DOCTOR) {
        return true;
      } else {
        const navigateByUrl = this.router.navigateByUrl('/login');
        return false;
      }
    } catch (e) {
      const navigateByUrl = this.router.navigateByUrl('/login');
    }
  }
}
