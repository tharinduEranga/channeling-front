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
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {DoctorComponent} from '../../view/doctor/doctor.component';
import {PanelHeadComponent} from '../../view/panel-head/panel-head.component';
import {SavemodalComponent} from '../../view/doctor/savemodal/savemodal.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {LoadingComponent} from '../../view/loading/loading.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {OtherComponent} from '../../view/other/other.component';
import {SaveComponent} from '../../view/other/save/save.component';
import {LoginComponent} from '../../login/login.component';
import {MedicineComponent} from '../../view/medicine/medicine.component';
import {SaveMedicineComponent} from '../../view/medicine/save-medicine/save-medicine.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AmazingTimePickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    SweetAlert2Module
  ],
  entryComponents: [
    SavemodalComponent,
    SaveComponent,
    SaveMedicineComponent
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
    SaveMedicineComponent
  ]
})

export class AdminLayoutModule {}
