<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ConfirmacionDonacion extends Mailable
{
    use Queueable, SerializesModels;

    public $donacion;

    /**
     * Create a new message instance.
     */
    public function __construct($donacion)
    {
        $this->donacion = $donacion;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Gracias por tu donación'
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.confirmacion', // Asegurate de tener este blade
            with: [
                'nombre' => $this->donacion->nombre_completo,
                'monto' => $this->donacion->monto,
                'moneda' => $this->donacion->moneda,
                'token' => $this->donacion->token,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments(): array
    {
        return [];
    }
}
