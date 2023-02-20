const swagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Clean Architecture Api",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/core/docs/responses.ts", "./src/user/infrastructure/swagger-docs.ts"],
};

export default swagger;
