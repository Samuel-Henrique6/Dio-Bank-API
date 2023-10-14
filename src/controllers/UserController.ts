import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (req: Request, res: Response) => {
    const { id, name, email } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name obrigatório!" });
    }

    if (!email) {
      return res.status(400).json({ message: "Email obrigatório!" });
    }

    this.userService.createUser(id, name, email);
    return res.status(201).json({ message: "Usuário criado" });
  };

  getUsers = (req: Request, res: Response) => {
    const users = this.userService.getUsers();
    return res.status(200).json(users);
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    const idNumber = parseInt(id);
    this.userService.deleteUser(idNumber);
    return res.status(200).json({ message: "Usuário deletado" });
  };
}
