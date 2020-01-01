import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export enum Roles {
    ADMIN = 'ADMIN', RECEPTION = 'RECEPTION', DOCTOR = 'DOCTOR'
}

export const ROUTES: RouteInfo[] = [];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    private userData: AdminDTO;
    menuItems: any[];

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        ROUTES.splice(0, ROUTES.length);
        this.userData = this.authService.userData;
        if (this.userData.roles === Roles.DOCTOR) {
            ROUTES.push(
                {path: '/appointments', title: 'Appointments', icon: '../../assets/img/faces/patient.png', class: ''},
            );
        } else if (this.userData.roles === Roles.RECEPTION) {
            ROUTES.push(
                {path: '/dashboard', title: 'Dashboard', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/doctors', title: 'Doctors', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/medicine', title: 'Medicine', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/patients', title: 'Patients', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/payments', title: 'Payments', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/other', title: 'Other', icon: '../../assets/img/faces/patient.png', class: ''},
            );
        } else if (this.userData.roles === Roles.ADMIN) {
            ROUTES.push(
                {path: '/dashboard', title: 'Dashboard', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/doctors', title: 'Doctors', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/appointments', title: 'Appointments', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/medicine', title: 'Medicine', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/patients', title: 'Patients', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/payments', title: 'Payments', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/reports', title: 'Reports', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/other', title: 'Other', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/admins', title: 'Admins', icon: '../../assets/img/faces/patient.png', class: ''},
                {path: '/upgrade', title: 'Upgrade to PRO', icon: '../../assets/img/faces/patient.png', class: 'active-pro'}
            );
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
