
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {DoctorComponent} from '../../view/doctor/doctor.component';
import {OtherComponent} from '../../view/other/other.component';
import {MedicineComponent} from '../../view/medicine/medicine.component';
import {PatientsComponent} from '../../view/patients/patients.component';
import {AppointmentsComponent} from '../../view/appointments/appointments.component';
import {PaymentsComponent} from '../../view/payments/payments.component';
import {AuthGuardService} from '../../auth/auth-guard.service';
import {ReportsComponent} from '../../view/reports/reports.component';
import {AdminAuthService} from '../../auth/admin-auth.service';
import {AdminsComponent} from '../../view/admins/admins.component';
import {ReceptionAuthService} from '../../auth/reception-auth.service';
import {DoctorAuthService} from '../../auth/doctor-auth.service';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'dashboard',      component: HomeComponent, canActivate: [AuthGuardService, DoctorAuthService] },
    { path: 'patients',       component: PatientsComponent, canActivate: [AuthGuardService, ReceptionAuthService] },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuardService, AdminAuthService] },
    { path: 'reports',        component: ReportsComponent, canActivate: [AuthGuardService, AdminAuthService] },
    { path: 'appointments',   component: AppointmentsComponent, canActivate: [AuthGuardService, DoctorAuthService] },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [AuthGuardService] },
    { path: 'doctors',        component: DoctorComponent, canActivate: [AuthGuardService, ReceptionAuthService] },
    { path: 'other',          component: OtherComponent, canActivate: [AuthGuardService, ReceptionAuthService] },
    { path: 'medicine',       component: MedicineComponent, canActivate: [AuthGuardService, ReceptionAuthService] },
    { path: 'payments',       component: PaymentsComponent, canActivate: [AuthGuardService, ReceptionAuthService] },
    { path: 'admins',       component: AdminsComponent, canActivate: [AuthGuardService, AdminAuthService] }
];
