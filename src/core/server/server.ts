import express, { Express } from "express";
import userRoutes from "../../user/infrastructure/user.routes";
import mongoDBInit from "../database/mongodb";

export class Server {
  public server: Express;

  constructor() {
    this.server = express();
  }

  async start() {
    try {
      const port = parseInt(process.env.PORT || "3000");

      await mongoDBInit();

      this.server.use("/user", userRoutes);

      this.server.listen(port);

      console.log(`Server listening on port ${port}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}
