import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.get("/user", userController.getUsers);
routes.post("/user", userController.createUser);
routes.delete("/user/:id", userController.deleteUser);

export default routes;
