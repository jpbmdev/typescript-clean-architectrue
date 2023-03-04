import express, { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import swaggerJSON from "../docs/swagger";
import userRoutes from "../../user/infrastructure/user.routes";
import mongoDBInit from "../database/mongodb";

export class Server {
  public server: Express;

  constructor() {
    this.server = express();
  }

  async initializeRoutes() {
    this.server.use(userRoutes);

    const specs = swaggerJsdoc(swaggerJSON);
    this.server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  async initialize() {
    try {
      await mongoDBInit();

      this.server.use(express.json());

      this.initializeRoutes();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  async start() {
    const port = parseInt(process.env.PORT || "3000");

    this.server.listen(port);

    console.log(`Server listening on port ${port}`);
  }
}
