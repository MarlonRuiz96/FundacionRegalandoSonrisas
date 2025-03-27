import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';

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

  constructor(private http: HttpClient) {}

  
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
    x_line_item: 'Donacion Regalando sonrisas',
    x_freight: 0.00,
    x_email: '',
    cc_number: '',
    cc_exp: '',
    cc_cvv2: '',
    cc_name: '',
    cc_type: '',
    x_first_name: '',
    x_last_name: '',
    x_company: 'Company',
    x_address: '',
    x_city: 'Guatemala',
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

  submitPayment() {
    const endpoint = 'https://api-sandboxpayments.qpaypro.com/checkout/api_v1';

    this.http.post(endpoint, this.paymentData).subscribe({
      next: (response) => {
        console.log('✅ Transacción exitosa:', response);
        alert('Pago simulado exitosamente (sandbox). Revisa consola para detalles.');
      },
      error: (error) => {
        console.error('❌ Error al procesar el pago:', error);
        alert('Ocurrió un error al simular el pago.');
      }
    });
  }
}
