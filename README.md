# 🌟 Fundación Solidaria Regalando Sonrisas

Bienvenido al sistema de donaciones de la Fundación Solidaria Regalando Sonrisas. Este proyecto permite realizar donaciones en línea mediante integración con **QPayPro Checkout Page**, ofreciendo un proceso seguro y automatizado de principio a fin.

---

## 🧾 Flujo de Donación y Procesamiento con QPayPro

### 💡 Descripción

Este sistema permite a los donantes realizar contribuciones a la **Fundación Solidaria Regalando Sonrisas** a través de un flujo completamente integrado con **QPayPro Checkout Page**.

---

### 🖼️ Interfaz amigable para el usuario

1. **Landing page** clara y simple con botón “Dona ahora”.
2. Al hacer clic, se muestra un formulario donde el usuario completa su información.
3. Una vez enviado el formulario:
   - Se genera un **token de pago** con QPayPro.
   - Se guarda la donación como **"pendiente"** en la base de datos MySQL.
   - El donante recibe un **correo con un enlace para completar el pago**.

---

### 💳 Procesamiento de Pago con QPayPro

- El donante es redirigido a la **Checkout Page de QPayPro**.
- Puede simular el pago usando los datos de prueba:
  ```
  Número de tarjeta: 4111 1111 1111 1111
  Fecha: cualquier fecha futura
  CVV: 123
  ```

---

### ✅ Confirmación Automática

- Una vez realizado el pago, QPayPro redirige al backend con los datos de la transacción.
- El sistema actualiza automáticamente en la base de datos:
  - `estado_pago` → exitoso
  - `factura` → número de factura de QPayPro
  - `referencia_transaccion` → ID de la transacción de QPayPro
- El donante recibe un **correo electrónico de confirmación** con los detalles del pago exitoso.

---

## 🛠️ Stack Tecnológico

- **Frontend**: Angular 19
- **Backend**: Laravel 11 (API RESTful)
- **Base de Datos**: MySQL
- **Pasarela de Pago**: QPayPro
- **Correo**: Notificaciones de confirmación con Laravel Mail

---

## 📬 Ejemplo de Correo Exitoso

![Correo exitoso](./capturas/correo_exitoso.PNG)

---

## 📷 Screenshots

| Vista Principal             | Formulario de Donación     | Checkout Page         |
|----------------------------|----------------------------|------------------------|
| ![](./capturas/gracias.PNG)   | ![](./capturas/form.png)   | ![](./capturas/pago.png) |

---

