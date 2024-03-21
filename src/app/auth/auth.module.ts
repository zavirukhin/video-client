import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoreModule } from '../core/core.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    ProfileComponent,
    ProfilePageComponent,
    AdminComponent,
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthModule { }
