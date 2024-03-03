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

**Prerrequisitos**:

- Una cuenta de comerciante de Wompi
- Conocimientos básicos de Node.js y la API de Wompi

## Variables de entorno

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

## Accede a la documentación de la API en

```bash
https://localhost:3000/docs
```


## Pruebas
Ejecuta las pruebas:

```bash
npm run test
```

[Endpoint de Swagger](https://api-transactions-vqu3.onrender.com/docs/)

## Contribuyendo
- Haz un fork del repositorio en GitHub
- Clona tu fork: git clone https://github.com/Jesus123780/api_transactions
- Crea una nueva rama: git checkout -b feature/nueva-funcionalidad
- Realiza tus cambios y haz commit: git commit -am 'Agrega nueva funcionalidad'
- Sube tus cambios: git push origin feature/nueva-funcionalidad
- Crea un nuevo pull request en GitHub.

## Autores
[Autor Jesus Juvinao](https://wa.link/eyrc66)

## Licencia

Este proyecto está licenciado bajo la Licencia ISC (https://opensource.org/license/isc-license-txt). Consulta el archivo LICENSE para obtener más detalles.