import { IUser, UserService } from "./UserService";

describe("UserService", () => {
  const mockDb: IUser[] = [];
  const userService = new UserService(mockDb);

  it("Deve adicionar um novo usuário", () => {
    const mockConsole = jest.spyOn(global.console, "log");
    userService.createUser(2, "Samuel", "samuel@gmail.com");
    expect(mockConsole).toHaveBeenCalledWith("DB atualizado", mockDb);
  });

  it("Deve retornar dados do banco", () => {
    const expectedData = userService.getUsers();
    expect(expectedData).toEqual(mockDb);
  });

  it("Deve filtrar o array por ID e retornar um novo array sem o ID", () => {
    const userService = new UserService();
    userService.db = [
      { id: 1, name: "Samuel", email: "samuel@gmail.com" },
      { id: 2, name: "Ancristian", email: "ancristian@gmail.com" },
      { id: 3, name: "João", email: "joao@gmail.com" },
    ];

    const idToDelete = 2;

    userService.deleteUser(idToDelete);

    expect(userService.db).toEqual([
      { id: 1, name: "Samuel", email: "samuel@gmail.com" },
      { id: 3, name: "João", email: "joao@gmail.com" },
    ]);
  });
});
