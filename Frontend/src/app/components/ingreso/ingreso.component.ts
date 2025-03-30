import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ],
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    const { usuario, password } = this.loginForm.value;

    this.loginService.login(usuario, password).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Credenciales incorrectas');
        this.loading = false;
      }
    });
  }
}
