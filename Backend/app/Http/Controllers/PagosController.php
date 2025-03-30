<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pago;
use App\Models\Transaccion;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http; // ✅ Esta línea es la correcta aquí arriba
use Illuminate\Support\Facades\Log;


use App\Mail\ConfirmacionDonacion;




class PagosController extends Controller
{
    public function index()
    {
        return response()->json(Pago::all());
    }

    public function show ($id)
    {
        $Pago = Pago::find($id);
        if ($Pago) {
            return response()->json($Pago);
        } else {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
    }

    public function store(Request $request)
    {
        $Pago = Pago::create($request->all());
        Mail::to($Pago->email)->send(new ConfirmacionDonacion($Pago));

        return response()->json($Pago, 201);
    }
    public function update(Request $request, $id)
    {
        $Pago = Pago::find($id);
        if ($Pago) {
            $Pago->update($request->all());
            return response()->json($Pago);
        } else {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
    }

    public function destroy($id)
    {
        $Pago = Pago::find($id);
        if ($Pago) {
            $Pago->delete();
            return response()->json(['message' => 'Donación eliminada']);
        } else {
            return response()->json(['error' => 'Donación no encontrada'], 404);
        }
    }

    public function totaldonadoenQ()
    {
        $total = Pago::where('moneda', 'GTQ')->sum('monto');
        return response()->json([$total]);

    }

    public function totaldonadoenUSD()
    {
        $total = Pago::where('moneda', 'USD')->sum('monto');
        return response()->json([$total]);

    }

    Public function donacionesvalidas()
    {
        $donaciones = Pago::where('estado_pago', 'exitoso')->count();
        return response()->json($donaciones);
    }

    public function donacionespendientes()
    {
        $donaciones = Pago::where('estado_pago', 'pendiente')->count();
        return response()->json($donaciones);
    }
    public function donacionesfallidas()
    {
        $donaciones = Pago::where('estado_pago', 'fallido')->count();
        return response()->json($donaciones);
    }

    public function donacionespordepartamento()
    {
        $donaciones = Pago::select('departamento', \DB::raw('count(*) as total'))
            ->groupBy('departamento')
            ->orderBy('total', 'desc')
            ->get();
        return response()->json($donaciones);
    }

    
    public function pagoExitoso(Request $request)
    {
        $status = $request->query('x_response_status');
        $transaccion = $request->query('x_trans_id');
        $monto = $request->query('x_amount');
        $moneda = $request->query('x_currency_code');
        $mensaje = $request->query('x_response_text');
        $codigo = $request->query('x_response_code');
        $factura = $request->query('x_invoice_num');
        $hash = $request->query('x_MD5_Hash');
    
        // Obtener detalle completo desde QPayPro (lo usás para saber el x_reference)
        $detalle = $this->obtenerDetalleTransaccion($transaccion);
    
 
    
        // 1. Buscar el modelo Pago
        $donacion = $this->getDonacionModelByReferencia($detalle);
    
        // 2. Si existe, actualizar factura y referencia_transaccion
        if ($donacion) {
            $donacion->update([
                'factura' => $factura,
                'referencia_transaccion' => $transaccion,
                'estado_pago' => "Exitoso",
                'metodo' => "Tarjeta de Crédito",
            ]);
    
            // Si querés, actualizá también 'estado_pago' => 'exitoso' 
            // o lo que corresponda
            // 'estado_pago' => ($status == 1) ? 'exitoso' : 'fallido'
        }
    
        // 3. Guardar la transacción en tu tabla "transacciones"
        Transaccion::create([
            'estado' => $status == 1 ? 'exitoso' : 'fallido',
            'codigo_respuesta' => $codigo,
            'mensaje_respuesta' => $mensaje,
            'referencia_transaccion' => $transaccion,
            'factura' => $factura,
            'monto' => $monto,
            'moneda' => $moneda,
            'hash' => $hash,
            'datos_completos' => json_encode($request->query()),
        ]);
    
        return response()->json($donacion);
    }
    
    private function getDonacionModelByReferencia($referencia)
{
    return Pago::where('referencia', $referencia)->first();
}


public function obtenerDonacionporReferencia($referencia)
{
    $donacion = Pago::where('referencia', $referencia)->first();

    if ($donacion) {
        return response()->json($donacion); // ✅ Esto devuelve JSON bien
    } else {
        return response()->json(['error' => 'Donación no encontrada'], 404);
    }
}





public function obtenerDetalleTransaccion($idTrans)
{
    $response = Http::post('https://api-sandboxpayments.qpaypro.com/checkout/get_transaction_detail', [
        'x_login' => 'visanetgt_qpay',
        'x_private_key' => '88888888888',
        'x_api_secret' => '99999999999',
        'idTrans' => $idTrans
    ]);

    $json = $response->json();

    return $json['response'][0]['petition']['x_reference'] ?? null;
}



public function obtenerTransaccionesPendientes()
{
    $transacciones = Pago::where('estado_pago', 'Pendiente')
        ->get(['estado_pago', 'referencia_transaccion', 'referencia']);
    return response()->json($transacciones);
}




}