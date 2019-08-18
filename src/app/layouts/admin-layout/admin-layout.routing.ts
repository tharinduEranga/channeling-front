// @ts-ignore
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {DoctorComponent} from '../../view/doctor/doctor.component';
import {OtherComponent} from '../../view/other/other.component';
import {MedicineComponent} from '../../view/medicine/medicine.component';
import {PatientsComponent} from '../../view/patients/patients.component';

export const AdminLayoutRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    { path: 'dashboard',      component: HomeComponent },
    { path: 'patients',       component: PatientsComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'doctors',        component: DoctorComponent },
    { path: 'other',          component: OtherComponent },
    { path: 'medicine',       component: MedicineComponent }
];
