import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';

export const routes: Routes = [
    //{ path: '', component: LoginComponent }
    { path: '', redirectTo: '/homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'forgot-password-reset', component: ForgotPasswordResetComponent },
    { path: 'videocontent', component: StartscreenComponent },

];
