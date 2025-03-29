<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pago;

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


    


}
