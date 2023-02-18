import { Router } from "express";
import { expressRouteAdapter } from "../factory/expressRouteAdapter";
import { mongoController } from "../factory/mongoController";

const userController = mongoController();

const router = Router();

router.get("/:email", expressRouteAdapter(userController, "getUser"));
router.put("/:email", expressRouteAdapter(userController, "updateUser"));
router.delete("/:email", expressRouteAdapter(userController, "deleteUser"));
router.get("/", expressRouteAdapter(userController, "listUsers"));
router.post("/", expressRouteAdapter(userController, "insertUser"));

export default router;
