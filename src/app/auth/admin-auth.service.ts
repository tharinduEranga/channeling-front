import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Roles} from '../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {
  private userData: AdminDTO;
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean
      | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userData = this.authService.userData;
    try {
      if (this.userData.roles === Roles.ADMIN) {
        return true;
      } else {
        this.router.navigateByUrl('/appointments');
        return false;
      }
    } catch (e) {
      this.router.navigateByUrl('/login');
    }
  }
}
