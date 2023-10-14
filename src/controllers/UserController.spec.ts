import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    deleteUser: jest.fn(),
  };

  const userController = new UserController(mockUserService as UserService);

  it("Deve adcionar um novo usuário", () => {
    const mockRequest = {
      body: {
        id: 2,
        name: "Ancristian",
        email: "ancristian@gmail.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário criado",
    });
  });

  it("Deve mostrar erro se name não for informado", () => {
    const mockRequest = {
      body: {
        id: 2,
        email: "ancristian@gmail.com",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Name obrigatório!",
    });
  });

  it("Deve mostrar erro se email não for informado", () => {
    const mockRequest = {
      body: {
        id: 2,
        name: "Ancristian",
      },
    } as Request;
    const mockResponse = makeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Email obrigatório!",
    });
  });

  it("Deve buscar pegar os dados", () => {
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();

    userController.getUsers(mockRequest, mockResponse);
    expect(mockUserService.getUsers).toHaveBeenCalled();
  });

  it("Deve buscar deletar usuario por id", () => {
    const mockRequest = makeMockRequest({ params: { id: "1" } });
    const mockResponse = makeMockResponse();

    userController.deleteUser(mockRequest, mockResponse);
    expect(mockUserService.deleteUser).toHaveBeenCalled();
    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: "Usuário deletado",
    });
  });
});
