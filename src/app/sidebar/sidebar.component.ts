import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/doctors', title: 'Doctors', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/table', title: 'Appointments', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/typography', title: 'Medicine', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/maps', title: 'Patients', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/icons', title: 'Payments', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/reports', title: 'Reports', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/other', title: 'Other', icon: '../../assets/img/faces/patient.png', class: ''},
    {path: '/upgrade', title: 'Upgrade to PRO', icon: '../../assets/img/faces/patient.png', class: 'active-pro'},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
