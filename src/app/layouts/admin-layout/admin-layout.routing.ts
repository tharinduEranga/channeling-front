
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {DoctorComponent} from '../../view/doctor/doctor.component';
import {OtherComponent} from '../../view/other/other.component';
import {MedicineComponent} from '../../view/medicine/medicine.component';
import {PatientsComponent} from '../../view/patients/patients.component';
import {AppointmentsComponent} from '../../view/appointments/appointments.component';
import {PaymentsComponent} from '../../view/payments/payments.component';
import {AuthGuardService} from '../../auth/auth-guard.service';
import {ReportsComponent} from '../../view/reports/reports.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'dashboard',      component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'patients',       component: PatientsComponent, canActivate: [AuthGuardService] },
    { path: 'typography',     component: TypographyComponent, canActivate: [AuthGuardService] },
    { path: 'reports',        component: ReportsComponent, canActivate: [AuthGuardService] },
    { path: 'appointments',   component: AppointmentsComponent, canActivate: [AuthGuardService] },
    { path: 'upgrade',        component: UpgradeComponent, canActivate: [AuthGuardService] },
    { path: 'doctors',        component: DoctorComponent, canActivate: [AuthGuardService] },
    { path: 'other',          component: OtherComponent, canActivate: [AuthGuardService] },
    { path: 'medicine',       component: MedicineComponent, canActivate: [AuthGuardService] },
    { path: 'payments',       component: PaymentsComponent, canActivate: [AuthGuardService] }
];
