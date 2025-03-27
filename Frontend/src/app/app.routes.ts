import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    { path: '', component: LoginComponent },// Ruta por defecto
    { path: '**', redirectTo: 'login', pathMatch: 'full' }, // Ruta para manejar rutas desconocidas
    {path: 'login', component: LoginComponent}, // Ruta para el componente de inicio de sesión


];
