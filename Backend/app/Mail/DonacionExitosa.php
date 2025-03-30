<?php

namespace App\Mail;

use App\Models\Pago; // ✅ Aquí importás correctamente el modelo
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DonacionExitosa extends Mailable
{
    use Queueable, SerializesModels;

    public $donacion;

    public function __construct(Pago $donacion)
    {
        $this->donacion = $donacion;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Donacion Exitosa',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.exitoso',
            with: [
                'nombre' => $this->donacion->nombre_completo,
                'monto' => $this->donacion->monto,
                'moneda' => $this->donacion->moneda,
                'transaccion_id' => $this->donacion->referencia_transaccion,
                'fecha' => $this->donacion->created_at->format('Y-m-d H:i'),
            ]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
