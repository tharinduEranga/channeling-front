import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ErrorHandler, NgModule} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {NavbarModule} from './shared/navbar/navbar.module';
import {FooterModule} from './shared/footer/footer.module';
import {SidebarModule} from './sidebar/sidebar.module';

import {AppComponent} from './app.component';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {ErrorHandleChennel} from './util/ErrorHandleChennel';
import {TokenInterceptor} from './auth/TokenInterceptor';


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
        {provide: ErrorHandler, useClass: ErrorHandleChennel},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
