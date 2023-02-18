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

  async start() {
    try {
      const port = parseInt(process.env.PORT || "3000");

      await mongoDBInit();

      this.server.use(express.json());

      this.initializeRoutes();

      this.server.listen(port);

      console.log(`Server listening on port ${port}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
