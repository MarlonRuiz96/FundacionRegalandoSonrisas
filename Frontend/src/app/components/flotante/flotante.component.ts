import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flotante',
  standalone: true,
  imports: [],
  templateUrl: './flotante.component.html',
  styleUrl: './flotante.component.css'
})
export class FlotanteComponent {
  constructor(private router: Router) {}

  irAlDashboard() {
    this.router.navigate(['/ingreso']);
  }
}
