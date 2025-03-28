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

// Servicios
import { PagosService } from '../../services/pagos.service';
import { QpayproService } from '../../services/qpaypro.service';

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

  constructor(private http: HttpClient, private pagosService: PagosService, private qpayproService: QpayproService) {}

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



  submitPayment() {
    // Aseguramos que el campo x_line_item esté bien formado
    this.paymentData.x_line_item = `Donación<|>DON001<|>Donación benéfica<|>1<|>${this.paymentData.x_amount}<|>N`;
  
    this.qpayproService.procesarPago(this.paymentData).subscribe({
      next: (respuestaQPayPro) => {
        console.log('✅ Pago exitoso en QPayPro:', respuestaQPayPro, respuestaQPayPro.idTransaction);
        alert('¡Pago procesado exitosamente con QPayPro!');
        
  
        // ✅ Creamos aquí donacionData con los datos ya ingresados
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
  
        // Enviamos a tu backend
        this.pagosService.procesarPago(donacionData).subscribe({
          next: (respuesta) => {
            console.log('✅ Donación guardada:', respuesta);
            alert('¡Donación guardada exitosamente!');
          },
          error: (error) => {
            console.error('❌ Error al guardar donación:', error);
            alert('Ocurrió un error al guardar la donación.');
          }
        });
  
      },
      error: (errorQPayPro) => {
        console.error('❌ Error en QPayPro:', errorQPayPro);
        alert('Ocurrió un error al procesar el pago con QPayPro.');
      }
    });
  }
  
  
}
