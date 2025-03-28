import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent}, // Ruta para el componente del dashboard
    {path: 'login', component: LoginComponent}, // Ruta para el componente de inicio de sesión

    { path: '', component: LoginComponent },// Ruta por defecto
    { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Ruta para manejar rutas desconocidas




];
