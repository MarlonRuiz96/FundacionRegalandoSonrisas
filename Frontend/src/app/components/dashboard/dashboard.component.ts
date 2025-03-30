import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

import { PagosService } from '../../services/pagos.service';
import { VerificarPagoService } from '../../services/verificar-pago.service';

interface Donation {
  id: number;
  nombre_completo: string;
  email: string;
  monto: number;
  moneda: string;
  estado_pago: string;
  departamento: string;
  created_at: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private pagosService: PagosService,
    private verificarPagoService: VerificarPagoService
  ) {}

  // Variables
  totalDonacionesEnGTQ: any = 0;
  totalDonacionesEnUSD: any = 0;
  totalfallidas: number = 0;
  totalExitosas: number = 0;
  totalPendientes: number = 0;

  donations: Donation[] = [];
  departamentos: string[] = [];
  totalDonaciones: number[] = [];

  pago: string = '435175'; // ID de transacción para verificar

  arrayporactualizar: any[] = [];

  // Chart configs
  barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  barChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Donaciones',
        data: [],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#6366F1',
          '#F472B6',
          '#FBBF24',
        ],
      },
    ],
  };

  pieChartData: any = {
    labels: ['Exitosas', 'Pendientes', 'Fallidas'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  };

  // Filtros
  searchText = '';
  selectedStatus = 'todos';
  selectedDepartment = 'todos';

  ngOnInit() {

    //Verificamos pagos por actualizar
    this.pagosService.actualizarpagospendientes().subscribe((data: any) => {
      this.arrayporactualizar = data;
      console.log('Pagos por actualizar:', this.arrayporactualizar);
    });


    // Verificamos un pago específico (puedes hacer que esto se automatice o venga por parámetro)
    this.verificarPagoService.verificarPago(this.pago).subscribe({
      next: (response) => {
        const detalle = response.response[0];

        console.log('🧾 Detalles de la transacción:', detalle);
        console.log('🔗 x_reference:', detalle.petition?.x_reference);
        console.log('🧾 x_invoice_num:', detalle.petition?.x_invoice_num);
        console.log('🔑 x_transaction_id:', detalle.idTransaction);

        this.pagosService
          .actualizarpago(
            detalle.petition?.x_reference,
            detalle.petition?.x_invoice_num,
            detalle.idTransaction
          )
          .subscribe({
            next: (res) => {
              console.log('✅ Pago actualizado correctamente:', res);
              // Swal.fire('¡Actualizado!', 'El pago fue actualizado correctamente.', 'success');
            },
            error: (err) => {
              console.error('❌ Error al actualizar el pago:', err);
            },
          });
      },
      error: (error) => {
        console.error('❌ Error al verificar el pago:', error);
      },
    });

    // Estadísticas generales
    this.pagosService.getPagosGTQ().subscribe((data: number) => {
      this.totalDonacionesEnGTQ = data;
    });

    this.pagosService.getPagosUSD().subscribe((data: number) => {
      this.totalDonacionesEnUSD = data;
    });

    this.pagosService.getTotalPagosFallidos().subscribe((data: number) => {
      this.totalfallidas = data;
      this.updatePieChartData();
    });

    this.pagosService.getTotalPagosValidos().subscribe((data: number) => {
      this.totalExitosas = data;
      this.updatePieChartData();
    });

    this.pagosService.getTotalPagosPendientes().subscribe((data: number) => {
      this.totalPendientes = data;
      this.updatePieChartData();
    });

    this.pagosService.getPagos().subscribe((data: Donation[]) => {
      this.donations = data;
    });

    this.pagosService.getpagostodosdepartamentos().subscribe((data: any[]) => {
      this.departamentos = data.map((d) => d.departamento);
      this.totalDonaciones = data.map((d) => d.total);

      this.barChartData = {
        labels: this.departamentos,
        datasets: [
          {
            label: 'Donaciones',
            data: this.totalDonaciones,
            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#F59E0B',
              '#EF4444',
              '#6366F1',
              '#F472B6',
              '#FBBF24',
            ],
          },
        ],
      };

      console.log('📊 Departamentos:', this.departamentos);
      console.log('📊 Totales:', this.totalDonaciones);
    });
  }

  updatePieChartData() {
    this.pieChartData = {
      labels: ['Exitosas', 'Pendientes', 'Fallidas'],
      datasets: [
        {
          data: [this.totalExitosas, this.totalPendientes, this.totalfallidas],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
      ],
    };
  }

  get filteredDonations() {
    return this.donations.filter(
      (d) =>
        d.nombre_completo
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) &&
        (this.selectedStatus === 'todos' ||
          d.estado_pago === this.selectedStatus) &&
        (this.selectedDepartment === 'todos' ||
          d.departamento === this.selectedDepartment)
    );
  }

  get totalDonadoGTQ() {
    return Number(this.totalDonacionesEnGTQ).toFixed(2);
  }

  get totalDonadoUSD() {
    return Number(this.totalDonacionesEnUSD).toFixed(2);
  }

  get paymentStatusCounts() {
    return this.donations.reduce(
      (acc, curr) => {
        acc[curr.estado_pago as 'exitoso' | 'pendiente' | 'fallido']++;
        return acc;
      },
      { exitoso: 0, pendiente: 0, fallido: 0 }
    );
  }
}
