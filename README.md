# Orca Scan Service

Orca Scan Service is a web application built on top of NestJS framework, using Swagger and TypeORM. The purpose of the service is to help find a balance in EVM blockchains. 

## Getting Started

To get started with the Orca Scan Service, follow the instructions below:

### Prerequisites

Before running the application, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/get-npm) (v6 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

### Installation

1. Clone the repository to your local machine.
2. Open a terminal and navigate to the root of the project.
3. Run `npm install` to install the project dependencies.
4. Create and start a PostgreSQL database for the project.
5. Create a `.env` file in the root of the project and add the following environment variables:
   ```
   POSTGRES_HOST=<host>
   POSTGRES_PORT=<port>
   POSTGRES_USER=<username>
   POSTGRES_DB=<database>
   POSTGRES_PASSWORD=<password>

   ETH_RPC=<RPC Server Address>
   BSC_RPC=<RPC Server Address>
   ARB_RPC=<RPC Server Address>
   ERA_RPC=<RPC Server Address>
   OP_RPC=<RPC Server Address>
   MATIC_RPC=<RPC Server Address>
   AVAX_RPC=<RPC Server Address>

   ERA_MULTICALL="0x47898B2C52C957663aE9AB46922dCec150a2272c"
   ```
   Replace the `<username>`, `<password>`, `<host>`, `<port>`, `<database>` and `<RPC Server Address>` placeholders with the appropriate values.

### Running the Application

To run the application, use the following command:

```
npm run start:dev
```

This will start the application in development mode and watch for changes.

### API Documentation

The Orca Scan Service API documentation is generated using Swagger. To view the API documentation, start the application and navigate to `http://localhost:3000/api`.

## Contributing

Contributions are welcome! To contribute to the Orca Scan Service, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear commit messages.
4. Push your changes to your branch on your forked repository.
5. Submit a pull request to the main repository.

## License

The Orca Scan Service is open source software licensed under the [MIT license](https://opensource.org/licenses/MIT).