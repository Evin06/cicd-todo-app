const request = require('supertest');
const express = require('express');
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const router = require('../routes/index');  // Remplacez par le chemin de votre fichier router
const TodoModel = require("../database/models/todo.model");

// Utiliser votre routeur
app.use(express.json());
app.use(require("cookie-parser")());
app.use(router);

jest.mock("../database/models/todo.model");
jest.mock("jsonwebtoken");

describe("Todo Routes", () => {
  let token;
  let decodedToken;

  beforeEach(() => {
    token = "mockedToken";
    decodedToken = { sub: "validUserId" };
    jsonwebtoken.verify.mockImplementation(() => ({ sub: "507f191e810c19729de860ea" }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /todo/add - should create a new todo", async () => {
    const newTodo = { text: "Test todo" };
    TodoModel.prototype.save = jest.fn().mockResolvedValue();

    const response = await request(app)
      .post("/api/todo/add")
      .set("Cookie", [`token=${token}`])
      .send(newTodo);

    expect(jsonwebtoken.verify).toHaveBeenCalledWith(token, expect.anything());
    expect(response.status).toBe(200);
    expect(TodoModel.prototype.save).toHaveBeenCalled();
  });

  /*
  test("POST /todo/add - should return 400 if token is missing", async () => {
    const newTodo = { text: "Test todo" };

    const response = await request(app).post("/api/todo/add").send(newTodo);

    expect(response.status).toBe(400);
    expect(TodoModel.prototype.save).not.toHaveBeenCalled();
  });

  test("PATCH /todo/:id - should update a todo", async () => {
    const todoId = "507f191e810c19729de860ea"; // Mock ObjectId
    const updates = { text: "Updated todo" };

    TodoModel.updateOne.mockResolvedValue({ modifiedCount: 1 });

    const response = await request(app)
      .patch(`/todo/${todoId}`)
      .send(updates);

    expect(TodoModel.updateOne).toHaveBeenCalledWith(
      { _id: expect.any(Object) },
      { $set: updates }
    );
    expect(response.status).toBe(200);
    expect(response.body.modifiedCount).toBe(1);
  });

  test("DELETE /todo/:id - should delete a todo", async () => {
    const todoId = "507f191e810c19729de860ea"; // Mock ObjectId

    TodoModel.findOneAndDelete.mockResolvedValue();

    const response = await request(app).post(`/api/todo/${todoId}`);

    expect(TodoModel.findOneAndDelete).toHaveBeenCalledWith({ _id: expect.any(Object) });
    expect(response.status).toBe(200);
  });

  test("GET /todos - should fetch all todos for the user", async () => {
    const todos = [{ text: "First todo" }, { text: "Second todo" }];
    TodoModel.find.mockResolvedValue(todos);

    const response = await request(app)
      .get("/api/todo")
      .set("Cookie", [`token=${token}`]);

    expect(jsonwebtoken.verify).toHaveBeenCalledWith(token, expect.anything());
    expect(TodoModel.find).toHaveBeenCalledWith({ user_id: expect.any(Object) });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(todos);
  });
  */
});
