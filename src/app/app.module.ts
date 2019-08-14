// @ts-ignore
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// @ts-ignore
import {ErrorHandler, NgModule} from '@angular/core';
// @ts-ignore
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// @ts-ignore
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {ErrorHandleChennel} from './util/ErrorHandleChennel';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorHandleChennel}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
