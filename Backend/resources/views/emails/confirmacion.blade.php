<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Completa tu donación</title>
</head>
<body>
    <h2>¡Hola, {{ $nombre }}! 😊</h2>
    <p>Gracias por tu interés en apoyar nuestra causa. Estamos emocionados de contar con tu ayuda.</p>
    <p>Para completar tu donación de <strong>{{ $monto }} {{ $moneda }}</strong>, por favor haz clic en el siguiente enlace:</p>
    <p><a href="https://sandboxpayments.qpaypro.com/checkout/store?token={{ $token }}" style="color: blue; text-decoration: underline;">Completar mi donación</a></p>
    <p>Tu apoyo es invaluable para nuestra misión de ayudar a quienes más lo necesitan. Si tienes alguna pregunta, no dudes en contactarnos.</p>
    <p>¡Gracias por tu generosidad!</p>

    <p>Saludos cordiales,</p>
    <p>El equipo de la Fundación</p>
</body>
</html>
