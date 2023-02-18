import fastify, { FastifyInstance } from "fastify";
import UserRoutes from "../../user/infrastructure/user.routes";
import mongoDBInit from "../database/mongodb";

export class Server {
  public server: FastifyInstance;

  constructor() {
    this.server = fastify();
  }

  async start() {
    try {
      const port = parseInt(process.env.PORT || "3000");

      this.server.register(UserRoutes, { prefix: "/user" });

      await mongoDBInit();

      await this.server.listen({ port });
      console.log(`Server listening on port ${port}`);
    } catch (error) {
      console.log(error)
      this.server.log.error(error);
      process.exit(1);
    }
  }
}
