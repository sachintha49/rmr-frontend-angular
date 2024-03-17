import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterRestaurantComponent } from './register-restaurant/register-restaurant.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {'path': '', title: 'Dashboard', component:DashboardComponent},
    {'path': 'home', title: 'Home', component:HomePageComponent},
    {'path': 'add-restaurant', title: 'Restaurant Registration', component:RegisterRestaurantComponent},
    {'path': 'detail-page', title: 'Detail Page', component:DetailPageComponent},
    {'path': 'login', title: 'Login', component:LoginComponent},
    {'path': 'register-user', title: 'User-Registration', component:UserRegistrationComponent},
    {'path': '**', title: 'Page Not Found', component:PageNotFoundComponent}
];
