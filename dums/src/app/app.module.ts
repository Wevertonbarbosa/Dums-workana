import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
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
import { tokenInterceptor } from './Interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalUpdateComponent } from './Components/modal-update/modal-update.component';
import { ModalDeleteComponent } from './Components/modal-delete/modal-delete.component';
import { TransportadoraComponent } from './Pages/transportadora/transportadora.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageLoginComponent,
    RegisterComponent,
    MenuComponent,
    HomeComponent,
    FormEmitenteComponent,
    ModalUpdateComponent,
    ModalDeleteComponent,
    TransportadoraComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    PoModule,
    RouterModule.forRoot([]),
    PoTemplatesModule,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        tokenInterceptor
      ]),
      withInterceptorsFromDi()
    ),
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
