import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

constructor(private router: Router, private dialog: MatDialog) {}


  openModal() {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '1000px',
      height: '700px',
    });
  }
}
