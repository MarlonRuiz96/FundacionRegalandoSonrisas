<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Transacción</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #4CAF50;">¡Transacción Exitosa!</h2>
        <p>Estimado/a <strong>{{ $nombre }}</strong>,</p>
        <p>Nos complace informarle que su transacción se ha procesado con éxito.</p>
        <p><strong>Detalles de la transacción:</strong></p>
        <ul>
            <li><strong>ID de Transacción:</strong> {{ $transaccion_id }}</li>
            <li><strong>Monto:</strong> {{ $monto }} {{ $moneda }}</li>
            <li><strong>Fecha:</strong> {{ $fecha }}</li>
        </ul>
        <p>Si tiene alguna pregunta o necesita asistencia, no dude en ponerse en contacto con nuestro equipo de soporte.</p>
        <p>Gracias por confiar en nosotros.</p>
        <p>Atentamente,</p>
        <p><strong>El equipo de QPayPro</strong></p>
    </div>
</body>
</html>