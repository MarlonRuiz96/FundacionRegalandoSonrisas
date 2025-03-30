<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('transacciones', function (Blueprint $table) {
            $table->id();
            $table->string('estado'); // exitoso, fallido, etc.
            $table->string('codigo_respuesta')->nullable();
            $table->string('mensaje_respuesta')->nullable();
            $table->string('referencia_transaccion')->nullable();
            $table->string('factura')->nullable();
            $table->decimal('monto', 10, 2);
            $table->string('moneda')->nullable();
            $table->string('hash')->nullable();
            $table->json('datos_completos')->nullable(); // por si querés guardar todo el query string
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transacciones');
    }
};
