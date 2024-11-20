const request = require("supertest");
const express = require('express');
const UserModel = require("../database/models/user.model");
const TodoModel = require("../database/models/todo.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { keyPub } = require("../env/keys");

const app = express();
const router = require('../routes/index');  // Remplacez par le chemin de votre fichier router

app.use(express.json());
app.use(router);

// Mock dependencies
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../database/models/user.model");
jest.mock("../database/models/todo.model");

describe("User routes", () => {
  let token;
  let userId;

  beforeAll(() => {
    userId = "12345"; // Mock user ID for token generation
    token = jsonwebtoken.sign({ sub: userId }, keyPub, { expiresIn: "1h" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /add", () => {
    it("should create a new user successfully", async () => {
      const mockUser = { name: "Johns", email: "joashn@example.com", password: "password123" };
      bcrypt.hash.mockResolvedValue("hashedpassword"); // Mock bcrypt hashing

      UserModel.prototype.save.mockResolvedValue(mockUser); // Mock save method

      const response = await request(app)
        .post("/api/user/add")
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(mockUser.name);
      expect(response.body.email).toBe(mockUser.email);
    });

    it("should return error when user already exists", async () => {
      const mockUser = { name: "John", email: "john@example.com", password: "password123" };
      const error = new Error();
      error.code = 11000; // Simulate unique constraint error

      UserModel.prototype.save.mockRejectedValue(error);

      const response = await request(app)
        .post("/api/user/add")
        .send(mockUser);

      expect(response.status).toBe(400);
      expect(response.body).toBe("Un compte avec cet email exist déjà!");
    });
  });
/*
  describe("DELETE /delete", () => {
    it("should delete the current user successfully", async () => {
      jsonwebtoken.verify.mockReturnValue({ sub: userId }); // Mock token verification
      UserModel.findOneAndDelete.mockResolvedValue(true);
      TodoModel.deleteMany.mockResolvedValue(true);

      const response = await request(app)
        .delete("/api/user/delete")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeNull();
    });

    it("should return error if no token is provided", async () => {
      const response = await request(app).delete("/api/user/delete");

      expect(response.status).toBe(400);
      expect(response.body).toBeNull();
    });
  });

  describe("PATCH /edit", () => {
    it("should update user data successfully", async () => {
      const updatedData = { name: "Updated Name" };
      jsonwebtoken.verify.mockReturnValue({ sub: userId });

      UserModel.findOneAndUpdate.mockResolvedValue(updatedData);

      const response = await request(app)
        .patch("/api/user/edit")
        .set("Cookie", `token=${token}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedData.name);
    });

    it("should return error if no token is provided", async () => {
      const updatedData = { name: "Updated Name" };

      const response = await request(app)
        .patch("/api/user/edit")
        .send(updatedData);

      expect(response.status).toBe(400);
      expect(response.body).toBeNull();
    });
  });

  describe("GET /", () => {
    it("should get the current user data successfully", async () => {
      const userData = { name: "John", email: "john@example.com" };
      jsonwebtoken.verify.mockReturnValue({ sub: userId });

      UserModel.findById.mockResolvedValue(userData);

      const response = await request(app)
        .get("/api/user")
        .set("Cookie", `token=${token}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it("should return error if no token is provided", async () => {
      const response = await request(app).get("/api/user/");

      expect(response.status).toBe(400);
      expect(response.body).toBeNull();
    });
  });

  describe("POST /login", () => {
    it("should return test message for login", async () => {
      const response = await request(app).post("/api/user/login");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("test");
    });
  });*/
  
});
