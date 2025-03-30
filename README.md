# 🌟 Fundación Regalando Sonrisas

Sistema web para gestión de donaciones para la Fundación Solidaria **Regalando Sonrisas**, donde los usuarios pueden apoyar causas sociales a través de una experiencia intuitiva, transparente y segura.

---

## 📌 Características principales

- Página pública con llamada a la acción para donar.
- Formulario de donación (nombre, monto, moneda, departamento, email...).
- Integración con plataforma de pagos **QPayPro (Checkout Page)**.
- Confirmación de pago vía correo electrónico.
- Actualización automática del estado de la transacción.
- Panel administrativo con dashboard de donaciones.
- Autenticación por usuario y contraseña (solo backend/API con Laravel).
- Frontend moderno hecho con **Angular 19**.

---

## 📸 Capturas del sistema

### 🏠 Vista principal

![Principal](./capturas/principal.PNG)

Pantalla de bienvenida donde se muestra el logotipo y un botón claro para iniciar el proceso de donación.

---

### 📝 Formulario de donación

![Formulario](./capturas/formulario.PNG)

Formulario que recopila los datos necesarios antes de generar el pago en QPayPro. Todos los campos requeridos se validan antes de continuar.

---

### ✅ Formulario enviado con éxito

![Formulario Enviado](./capturas/Formulario_enviado.PNG)

Una vez enviado, se muestra un mensaje amigable al usuario y se le indica que revise su correo para continuar con el pago.

---

### 📩 Correo de confirmación de donación (link de pago)

![Correo Confirmar Pago](./capturas/correo_confirmar_pago.PNG)

El donante recibe un correo con el enlace directo al **Checkout de QPayPro** para finalizar el pago.

---

### 💳 Proceso de pago

El enlace recibido lleva al formulario de pago de QPayPro, donde el usuario puede pagar con tarjeta de crédito u otros métodos habilitados.

---

### 🎉 Vista de agradecimiento

![Gracias](./capturas/gracias.PNG)

Luego de realizar la donación, el usuario es redirigido a una vista de agradecimiento personalizada.

---

### 📬 Correo de confirmación de transacción exitosa

![Correo Exitoso](./capturas/correo_exitoso.PNG)

El sistema envía un segundo correo confirmando que la transacción fue procesada con éxito, junto con los detalles del pago (ID, monto y fecha).

---

### 🔒 Login administrativo

![Login](./capturas/login.PNG)

Login protegido con credenciales simples (usuario y contraseña). Autenticación vía API para acceder al dashboard de administración.

---

### 📊 Dashboard de donaciones

![Dashboard](./capturas/dashboard.PNG)

Panel de administración donde se visualizan:

- Totales por moneda
- Donaciones exitosas, pendientes y fallidas
- Donaciones por departamento (gráfico de barras)
- Estado de pagos (gráfico circular)
- Tabla con detalle de cada transacción

---

## 🔐 Flujo técnico

1. El usuario entra en la página principal y hace clic en **Dona Ahora**.
2. Llena el formulario y se guarda el registro en la base de datos como "pendiente".
3. Se le envía un correo con el link al **Checkout de QPayPro**.
4. Al completar el pago, QPayPro redirige a nuestra API (Laravel).
5. Se actualiza la base de datos con los datos reales del pago (`id_transacción`, `factura`, etc).
6. Se envía un correo final de confirmación.
7. El admin puede consultar todo desde el dashboard privado.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**: Angular 19 + Tailwind CSS
- **Backend/API**: Laravel 11
- **Base de datos**: MySQL
- **Pasarela de pagos**: QPayPro (Checkout Page)
- **Email**: Laravel Mail con plantillas Blade

---

## 📦 Instalación y despliegue

```bash
# Clonar el proyecto SSH
git clone git@github.com:MarlonRuiz96/FundacionRegalandoSonrisas.git

# Backend
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

# Frontend
cd ../Frontend
npm install
ng serve


## 🧪 Prueba la Demo

Puedes probar el sistema completo de principio a fin con los siguientes pasos:

### 🌐 Sitio de prueba

👉 [https://qpaypro.marlonruiz.dev](https://qpaypro.marlonruiz.dev)

Haz clic en el botón **DONA AHORA**, completa el formulario y revisa tu correo electrónico.

---

### 💳 Datos para pruebas (QPayPro)

En el paso de **pago con tarjeta**, utiliza los siguientes datos de prueba:

| Campo                 | Valor                |
|-----------------------|----------------------|
| **Número de tarjeta** | `4111 1111 1111 1111` |
| **Fecha de vencimiento** | `11 / 27`             |
| **CVV**               | `123`                |
| **Teléfono**          | `+50250417389`       |

✅ Al completar el proceso, el sistema:

- Guarda la donación en estado **pendiente**
- Envía un **correo con un enlace de pago**
- Redirecciona a la **Checkout Page de QPayPro**
- Procesa el pago y actualiza el estado a **exitoso**
- Envía un **correo de confirmación** con los detalles de la transacción

---

> 💡 Este flujo permite simular una donación real de extremo a extremo utilizando datos de prueba, sin hacer cargos reales.

