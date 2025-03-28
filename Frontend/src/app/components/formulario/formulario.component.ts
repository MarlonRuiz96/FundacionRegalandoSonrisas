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

  mensaje = 'Formulario de donación';

  paymentData: any = {
    x_login: 'visanetgt_qpay',
    x_private_key: '88888888888',
    x_api_secret: '99999999999',
    x_product_id: 6,
    x_audit_number: 123456,
    x_fp_sequence: Date.now(),
    x_fp_timestamp: Math.floor(Date.now() / 1000),
    x_invoice_num: 123456,
    x_currency_code: '',
    x_amount: 1.00,
    x_line_item: "Donacion",
    x_freight: 0.00,
    x_email: '',
    cc_number: '',
    cc_exp: '',
    cc_cvv2: '',
    cc_name: '',
    cc_type: 'visa',
    x_first_name: '',
    x_last_name: '',
    x_company: 'Company',
    x_address: '',
    x_city: '',
    x_state: 'Guatemala',
    x_country: 'Guatemala',
    x_zip: '01056',
    x_relay_response: 'none',
    x_relay_url: 'none',
    x_type: 'AUTH_ONLY',
    x_method: 'CC',
    http_origin: 'http://local.test.com',
    visaencuotas: 0,
    payment_response_url: {
      success_url: 'https://example.com/success.html',
      error_url: 'https://example.com/error.html'
    },
    origen: 'TESTAPI',
    finger: ''
  };

  verificarDatosCompletos(): boolean {
    const d = this.paymentData;
    return (
      d.x_first_name.trim() !== '' &&
      d.x_last_name.trim() !== '' &&
      d.x_email.includes('@') &&
      d.x_amount > 0 &&
      d.x_currency_code !== '' &&
      d.cc_number.trim() !== '' &&
      d.cc_exp.trim() !== '' &&
      d.cc_cvv2.trim() !== '' &&
      d.cc_name.trim() !== '' &&
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

    this.paymentData.x_line_item = `Donación<|>DON001<|>Donación benéfica<|>1<|>${this.paymentData.x_amount}<|>N`;

    this.qpayproService.procesarPago(this.paymentData).subscribe({
      next: (respuestaQPayPro) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Pago procesado exitosamente con QPayPro.',
          confirmButtonText: 'Aceptar'
        });

        const donacionData = {
          nombre_completo: `${this.paymentData.x_first_name} ${this.paymentData.x_last_name}`,
          email: this.paymentData.x_email,
          monto: this.paymentData.x_amount,
          moneda: this.paymentData.x_currency_code,
          mensaje: 'Donación procesada',
          estado_pago: 'exitoso',
          factura: this.paymentData.x_invoice_num.toString(),
          referencia_transaccion: respuestaQPayPro.idTransaction || 'N/A',
          metodo: 'tarjeta',
          departamento: this.paymentData.x_city,
        };

        this.pagosService.procesarPago(donacionData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Donación guardada exitosamente.',
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
          text: 'Ocurrió un error al procesar el pago con QPayPro, por favor verifica los datos de su tarjeta e intente nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
