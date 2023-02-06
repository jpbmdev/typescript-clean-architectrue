import "dotenv/config";
import fastify from "fastify";
import mongoDBInit from "./database/mongodb";
import UserRoutes from "./routes/user.routes";

const server = fastify();

server.register(UserRoutes, { prefix: "/user" });

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || "3000");
    await mongoDBInit();
    await server.listen({ port });
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
