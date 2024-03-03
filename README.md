# API Transactions

This is an API project to handle payment transactions and rides, using technologies like Express, TypeScript, Sequelize, and Wompi.

*This project utilizes the hexagonal design pattern to organize its architecture and separate business concerns from external technologies. The hexagonal design pattern promotes code modularity and maintainability by focusing on the problem domain and decoupling it from external implementations, such as databases or user interfaces.
*

- 1 - Create a payment method for a user using a pre-tokenized card
- 2 - Request a ride with immediate driver assignment and ride initiation
- 3 - Finish a ride, calculate the total amount based on distance, time, and base fare, and create a transaction in Wompi

## Features:

- Secure and efficient handling of Wompi payment methods and transactions
- Smooth ride request and initiation process, optimizing user experience
- Precise fare calculation considering distance, time, and base fare

## Installation: 

Clone the repository:
```bash
git clone https://github.com/Jesus123780/api_transactions
```

## Install dependencies
```bash
cd api_transactions
npm install
```

## Configuration


**Prerequisites**:

- A Wompi merchant account
- Basic knowledge of Node.js and Wompi API

## Environment Variables


Create a *.env* file in the root of the project and provide the following values:


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
## Usage
Start the server in development:



```bash
npm run dev
```

## Access the API documentation at

```bash
https://localhost:3000/docs
```

## Endpoints

Create a Ride

- URL: [/api/v1/ride/createRide](https://api-transactions-vqu3.onrender.com/api/v1/ride/createRide)
- Method: POST
- Request Body
```bash
{
  "latitude": 4.793315895432347,
  "longitude": -75.73768527482514,
  "idUserRider": 1,
  "email": "juvinaojesusd@gmail.com",
  "endLatitude": 4.831870662263195,
  "endLongitude": -75.68060921521975,
  "type": "CARD",
  "currency": "COP"
}
```
- Response: Returns details of the created transaction.

## Tests
Run the tests:

```bash
npm run test
```

[Swagger Endpoint](https://api-transactions-vqu3.onrender.com/docs/)


## Scripts
- *dev*: start the server in development mode with hot reloading.
- *test*: run automated tests using Jest.
- *lint*: lint the codebase using ESLint.
- *build*: compile TypeScript code into JavaScript and babelify for production deployment.

## Contributing
- Fork the repository on GitHub
- Clone your fork: git clone https://github.com/Jesus123780/api_transactions
- Create a new branch: git checkout -b feature/new-feature
- Make your changes and commit: git commit -am 'Add new feature'
- Push your changes: git push origin feature/new-feature
- Create a new pull request on GitHub.

## Authors
[Autor Jesus Juvinao](https://wa.link/eyrc66)

## Support
Ask any questions or raise any issues on the project's GitHub repository.


## License

This project is licensed under the ISC License (https://opensource.org/license/isc-license-txt). See the LICENSE file for more details.