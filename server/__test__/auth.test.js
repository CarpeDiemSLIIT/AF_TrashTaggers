import supertest from "supertest";
import app from "../app.js";
import connectDB from "../config/db.js";
import mongoose from "mongoose";

/* eslint-disable no-undef */

beforeAll(async () => {
  await connectDB();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

describe("User auth POST /api/auth", () => {
  describe("Register User ", () => {
    it("Duplicate user", async () => {
      const response = await supertest(app).post("/api/auth/register").send({
        firstName: "kamal",
        lastName: "kamal",
        email: "kamal@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
    it("Register with a missing field", async () => {
      const useData = [
        {
          firstName: "kamal",
          lastName: "",
          email: "kamal@gmail.com",
          password: "password",
        },
        {
          firstName: "",
          lastName: "kamal",
          email: "kamal@gmail.com",
          password: "password",
        },
        {
          firstName: "kamal",
          lastName: "kamal",
          email: "",
          password: "password",
        },
        {
          firstName: "kamal",
          lastName: "kamal",
          email: "kamal@gmail.com",
          password: "",
        },
        {},
      ];
      for (const user of useData) {
        const response = await supertest(app)
          .post("/api/auth/register")
          .send(user);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
          msg: "Not all fields have been entered. ",
        });
      }
    });
  });
  describe("User Login", () => {
    // when the correct credentials are passed
    it("User user login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "kamal@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });
});
