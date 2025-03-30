import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';

// Servicios
import { PagosService } from '../../services/pagos.service';
import { QpayproService } from '../../services/qpaypro.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  datosllenos: boolean = false;

  constructor(
    private http: HttpClient,
    private pagosService: PagosService,
    private qpayproService: QpayproService,
    private dialogRef: MatDialogRef<FormularioComponent>
  ) {}

  //variables
  x_mensaje: string = '';

  paymentData: any = {
    x_login: 'visanetgt_qpay',
    x_api_key: '88888888888',
    x_amount: 0, // Monto de la donación
    x_currency_code: 'GTQ', // Moneda
    x_first_name: '', // Nombre del donante en factura
    x_last_name: '', // Apellido del donante en factura
    // Teléfono del donante en factura
    x_ship_to_address: 'Guatemala', // Dirección del donante de envio
    x_ship_to_city: 'Guatemala', // Ciudad del donante - Jalar del formulario
    x_ship_to_country: 'Guatemala', 
    x_ship_to_state: '0',
    x_ship_to_zip: '1010',
    x_ship_to_phone: '11223344', // Teléfono del donante
    x_description: 'Order number: 123', // Descripción del producto
    x_reference: '', // Referencia del producto
    x_url_success: 'https://qpaypro.marlonruiz.dev/api/pago/exitoso',
    x_url_error: 'https://qpaypro.marlonruiz.dev/api/pago/fallido',
    x_url_cancel: 'https://qpaypro.marlonruiz.dev/api/pago/cancelado',
    http_origin: 'qpaypro.marlonruiz.dev',
    x_company: 'C/F',
    x_address: '', // Dirección del donante
    x_city: '', // Ciudad del donante - Jalar del formulario
    x_country: 'Guatemala',
    x_state: '0',
    x_zip: '1201',
    products: '[["Donativo - Cruz Roja Guatemalteca","100","","1","100","100"]]', // Productos cantidad precio y total son los utimos numeros.
    x_freight: 0.00,
    taxes: 0.00,
    x_email: '', // Email del donante
    x_type: 'AUTH_ONLY',
    x_method: 'CC',
    x_invoice_num: '',
    custom_fields: '',
    x_visacuotas: 'no',
    x_relay_url: 'https://qpaypro.marlonruiz.dev/api/pago/exitoso',
    origen: 'PLUGIN',
    store_type: 'hostedpage',
    x_discount: 0
  };

  verificarDatosCompletos(): boolean {
    const d = this.paymentData;
    return (
      d.x_first_name.trim() !== '' &&
      d.x_last_name.trim() !== '' &&
      d.x_email.includes('@') &&
      d.x_amount > 0 &&
      d.x_currency_code !== '' &&
      d.x_phone.trim() !== '' &&
      d.x_address.trim() !== '' &&
      d.x_city.trim() !== ''
    );
  }

  submitPayment() {
    this.datosllenos = this.verificarDatosCompletos();
  
    if (!this.datosllenos) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos obligatorios correctamente.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    // ✅ Generar número de factura único
    this.paymentData.x_invoice_num = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.paymentData.x_reference = `DON-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

  
    // ✅ Actualizar productos según monto ingresado
    this.paymentData.products = JSON.stringify([
      [
        "Donativo Regalando Sonrisas",
        this.paymentData.x_amount.toString(),
        "",
        "1",
        this.paymentData.x_amount.toString(),
        this.paymentData.x_amount.toString()
      ]
    ]);
  
    // ✅ Formato requerido por QPayPro
    this.paymentData.x_line_item = `Donación<|>DON001<|>Donación benéfica<|>1<|>${this.paymentData.x_amount}<|>${this.paymentData.x_amount}`;
  
    // ✅ Enviar datos a QPayPro (obtener token)
    this.qpayproService.procesarPago(this.paymentData).subscribe({
      next: (respuestaQPayPro) => {
        // ✅ Preparar datos para guardar en Laravel
        const donacionData = {
          nombre_completo: `${this.paymentData.x_first_name} ${this.paymentData.x_last_name}`,
          email: this.paymentData.x_email,
          telefono: this.paymentData.x_phone,
          direccion: this.paymentData.x_address,
          monto: this.paymentData.x_amount,
          moneda: this.paymentData.x_currency_code,
          mensaje: this.x_mensaje,
          estado_pago: 'Pendiente',
          factura: this.paymentData.x_invoice_num, // ✅ Guardamos la misma que mandamos a QPayPro
          referencia_transaccion: 'Pendiente',
          metodo: '',
          departamento: this.paymentData.x_city,
          token: respuestaQPayPro.data.token,
          referencia: this.paymentData.x_reference,
        };
  
        // ✅ Guardar la donación en tu backend Laravel
        this.pagosService.procesarPago(donacionData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Donación guardada exitosamente, por favor revisa tu correo para continuar con el proceso.',
              confirmButtonText: 'Aceptar'
            });
            this.dialogRef.close({ success: true, mensaje: 'Donación completada' });
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error al guardar la donación.',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el token de pago.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  
  
}
