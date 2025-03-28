<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donaciones', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_completo');
            $table->string('email');
            $table->decimal('monto', 10, 2);
            $table->string('moneda', 5)->default('GTQ');
            $table->text('mensaje')->nullable();
            $table->string('estado_pago')->default('pendiente'); // exitoso, fallido, pendiente
            $table->string('factura')->nullable(); // x_invoice_num o generado
            $table->string('referencia_transaccion')->nullable(); // ID de QPayPro
            $table->string('metodo')->nullable(); // CC, ACH, etc.
            $table->string('departamento');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donaciones');
    }
};
