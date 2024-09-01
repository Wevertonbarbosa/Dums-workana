import {
  HttpClientModule,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PageLoginComponent } from './Pages/page-login/page-login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './Components/menu/menu.component';
import { HomeComponent } from './Pages/home/home.component';
import { FormEmitenteComponent } from './Components/form-emitente/form-emitente.component';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageLoginComponent,
    RegisterComponent,
    MenuComponent,
    HomeComponent,
    FormEmitenteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
