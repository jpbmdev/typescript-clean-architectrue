import { Router } from "express";
import { expressRouteAdapter } from "../factory/expressRouteAdapter";
import { mongoController } from "../factory/mongoController";

const userController = mongoController();

const router = Router();

router.get("/user/:email", expressRouteAdapter(userController, "getUser"));

router.put("/user/:email", expressRouteAdapter(userController, "updateUser"));

router.delete(
  "/user/:email",
  expressRouteAdapter(userController, "deleteUser")
);

router.get("/user", expressRouteAdapter(userController, "listUsers"));

router.post("/user", expressRouteAdapter(userController, "insertUser"));

export default router;
