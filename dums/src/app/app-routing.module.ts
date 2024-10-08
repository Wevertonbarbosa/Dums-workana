import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './Pages/page-login/page-login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './Guards/auth.guard';
import { TransportadoraComponent } from './Pages/transportadora/transportadora.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'emitente', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'transportadora',
    component: TransportadoraComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
