<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaccion extends Model
{
    use HasFactory;
    protected $table = 'transacciones';

    protected $fillable = [
        'estado',
        'codigo_respuesta',
        'mensaje_respuesta',
        'referencia_transaccion',
        'factura',
        'monto',
        'moneda',
        'hash',
        'datos_completos',
    ];
}
