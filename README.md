# 🌟 Fundación Regalando Sonrisas

Sistema web para gestión de donaciones para la Fundación Solidaria **Regalando Sonrisas**, donde los usuarios pueden apoyar causas sociales a través de una experiencia intuitiva, transparente y segura.

---

## 📌 Características principales

- Página pública con botón de acción para donar.
- Formulario de donación con validaciones (nombre, monto, email, etc.).
- Generación de token para pago mediante **QPayPro (Checkout Page)**.
- Envío de correo con enlace de pago.
- Registro inicial como "pendiente", actualización automática al finalizar el pago.
- Envío de correo de confirmación de transacción exitosa.
- Dashboard administrativo para visualizar donaciones.
- Login protegido por autenticación básica.
- **Frontend**: Angular 19 | **Backend**: Laravel 11 | **DB**: MySQL

---

## 🖼️ Capturas del sistema

### 🏠 Vista principal

![Principal](./capturas/principal.PNG)  
Pantalla de bienvenida donde se muestra el logotipo y un botón claro para iniciar el proceso de donación.

---

### 📝 Formulario de donación

![Formulario](./capturas/formulario.PNG)  
Formulario para capturar los datos del donante. Al enviar, se registra la donación como **pendiente**.

---

### ✅ Confirmación de registro

![Formulario Enviado](./capturas/Formulario_enviado.PNG)  
Se notifica al usuario que su donación fue registrada y que debe revisar su correo.

---

### 📩 Correo con enlace de pago

![Correo Confirmar Pago](./capturas/correo_confirmar_pago.PNG)  
Correo automático con un botón que redirige a la **Checkout Page** de QPayPro para completar el pago.

---

### 💳 Formulario de pago en QPayPro

> Aquí se realiza el pago simulado usando tarjeta de prueba. El proceso es seguro y simulado (sin cobros reales).

---

### 🙌 Vista de agradecimiento

![Gracias](./capturas/gracias.PNG)  
Luego de completar el pago, el sistema redirige al usuario a una pantalla de agradecimiento.

---

### 📬 Correo de confirmación de transacción exitosa

![Correo Exitoso](./capturas/correo_exitoso.PNG)  
Correo con detalles del pago (ID de transacción, monto y fecha), confirmando la donación exitosa.

---

### 🔐 Login administrativo

![Login](./capturas/login.PNG)  
Acceso para el panel de administración, solo usuarios autenticados pueden acceder al dashboard.

---

### 📊 Dashboard de donaciones

![Dashboard](./capturas/dashboard.PNG)  
Panel visual e interactivo que muestra:

- Totales en GTQ/USD
- Donaciones exitosas, pendientes y fallidas
- Gráfico de barras por departamento
- Gráfico circular de estados de pagos
- Tabla con el detalle de cada donación

---

## 🔄 Flujo de donación

1. El usuario accede a [qpaypro.marlonruiz.dev](https://qpaypro.marlonruiz.dev)
2. Hace clic en **DONA AHORA**.
3. Llena el formulario → se guarda la donación en la base de datos con estado "pendiente".
4. Recibe un correo con enlace para pagar vía QPayPro.
5. Realiza el pago en QPayPro.
6. Nuestra API actualiza el estado a **exitoso**.
7. Recibe correo de confirmación.
8. Los administradores visualizan la transacción en el dashboard.

---

## 🧪 Prueba la Demo

### 🌐 Acceso

👉 [https://qpaypro.marlonruiz.dev](https://qpaypro.marlonruiz.dev)

Haz clic en **DONA AHORA**, llena los datos, y revisa tu correo para simular una transacción real.

---

### 💳 Datos de tarjeta de prueba

| Campo                 | Valor                |
|-----------------------|----------------------|
| **Número de tarjeta** | `4111 1111 1111 1111` |
| **Fecha de vencimiento** | `11 / 27`             |
| **CVV**               | `123`                |
| **Teléfono**          | `+50250417389`       |

✅ Este flujo simula una donación completa sin hacer cobros reales.

---

## 🚀 Instalación local

### Backend (Laravel 11)

```bash
git clone git@github.com:MarlonRuiz96/FundacionRegalandoSonrisas.git
cd FundacionRegalandoSonrisas/Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
