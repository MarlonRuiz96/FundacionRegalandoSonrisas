import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GraciasComponent } from './components/gracias/gracias.component';
import { IngresoComponent } from './components/ingreso/ingreso.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    {path: 'login', component: LoginComponent}, // Ruta para el componente de inicio de sesión
    {path: 'gracias', component: GraciasComponent}, // Ruta para el componente de gracias
    {path: 'ingreso', component: IngresoComponent}, // Ruta para el componente de ingreso


    { path: '', component: LoginComponent },// Ruta por defecto
    { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Ruta para manejar rutas desconocidas




];
