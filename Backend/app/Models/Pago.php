<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'donaciones';

    protected $fillable = [
        'nombre_completo',
        'email',
        'telefono',
        'direccion',
        'monto',
        'moneda',
        'mensaje',
        'estado_pago',
        'factura',
        'referencia_transaccion',
        'metodo',
        'departamento',
        'token',
        'referencia'
    ];
}
