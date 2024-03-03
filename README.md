# API Transactions

Este es un proyecto de API para manejar transacciones de pagos y viajes, utilizando tecnologías como Express, TypeScript, Sequelize y Wompi.

- 1 - Crear un método de pago para un usuario utilizando una tarjeta pre-tokenizada
- 2 - Solicitar un viaje con asignación inmediata de conductor e inicio del viaje
- 3 - Finalizar un viaje, calcular el monto total basado en la distancia, el tiempo y la tarifa base, y crear una transacción en Wompi

## Características:

- Manejo seguro y eficiente de métodos de pago y transacciones de Wompi
- Proceso fluido de solicitud y inicio de viaje, optimizando la experiencia del usuario
- Cálculo preciso de la tarifa considerando la distancia, el tiempo y la tarifa base

## Instalación

Clona el repositorio:
```bash
git clone https://github.com/Jesus123780/api_transactions
cd api_transactions
npm install
```

## Instala las dependencias
```bash
cd api_transactions
npm install
```

## Configuración
- **Prerrequisitos**:

- Una cuenta de comerciante de Wompi
- Conocimientos básicos de Node.js y la API de Wompi

Crea un archivo .env en la raíz del proyecto y proporciona los siguientes valores:

```bash
NAME_DB=nombre_de_la_base_de_datos
USER_DB=usuario_de_la_base_de_datos
HOST_DB=host_de_la_base_de_datos
PORT_DB=puerto_de_la_base_de_datos
DIALECT_DB=dialecto_de_la_base_de_datos
PASS_DB=contraseña_de_la_base_de_datos
PUBLIC_KEY_WOMPI=tu_clave_pública_de_Wompi
PRIVATE_KEY_WOMPI=tu_clave_privada_de_Wompi
```
## Uso
Inicia el servidor en desarrollo:

```bash
npm run dev
```