import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { HomeComponent } from '../../home/home.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import {DoctorComponent} from '../../view/doctor/doctor.component';
import {PanelHeadComponent} from '../../view/panel-head/panel-head.component';
import {SavemodalComponent} from '../../view/doctor/savemodal/savemodal.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {LoadingComponent} from '../../view/loading/loading.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {OtherComponent} from '../../view/other/other.component';
import {SaveComponent} from '../../view/other/save/save.component';
import {MedicineComponent} from '../../view/medicine/medicine.component';
import {SaveMedicineComponent} from '../../view/medicine/save-medicine/save-medicine.component';
import {SaveBrandComponent} from '../../view/medicine/save-brand/save-brand.component';
import {AppointmentsComponent} from '../../view/appointments/appointments.component';
import {PatientsComponent} from '../../view/patients/patients.component';
import {SavePatientComponent} from '../../view/patients/save-patient/save-patient.component';
import {APP_DATE_FORMATS, Formatdatepicker} from '../../util/format- datepicker';
import {PaymentsComponent} from '../../view/payments/payments.component';
import {UpdateComponent} from '../../view/appointments/update/update.component';
import {MaterialModule} from '../../material/material.module';
import {AuthGuardService} from '../../auth/auth-guard.service';
import {ReportsComponent} from '../../view/reports/reports.component';
import {AdminsComponent} from '../../view/admins/admins.component';
import {AdminAuthService} from '../../auth/admin-auth.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    ReactiveFormsModule,
    AmazingTimePickerModule,
    MaterialModule,
    SweetAlert2Module,
  ],
  entryComponents: [
    SavemodalComponent,
    SaveComponent,
    SaveMedicineComponent,
    SaveBrandComponent,
    SavePatientComponent,
    UpdateComponent
  ],
  declarations: [
    HomeComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    PanelHeadComponent,
    DoctorComponent,
    SavemodalComponent,
    LoadingComponent,
    OtherComponent,
    SaveComponent,
    MedicineComponent,
    SaveMedicineComponent,
    SaveBrandComponent,
    AppointmentsComponent,
    PatientsComponent,
    SavePatientComponent,
    PaymentsComponent,
    UpdateComponent,
    ReportsComponent,
    AdminsComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: Formatdatepicker},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    AuthGuardService,
    AdminAuthService
  ]
})

export class AdminLayoutModule {}
