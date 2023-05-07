
import supertest from "supertest";
import app from "../app.js";
import connectDBTest from "../config/db_Test.js";

import mongoose from "mongoose";

/* eslint-disable no-undef */

beforeAll(async () => {
  await connectDBTest();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
  done();
});

let token = "";

describe("User API /api/auth", () => {
  describe("Register User ", () => {
    it("Register user : POST /api/auth/register", async () => {
      const response = await supertest(app).post("/api/auth/register").send({
        firstName: "testFirstName",
        lastName: "testLastName",
        email: "testreg@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
    it("Duplicate user : POST /api/auth/register", async () => {
      const response = await supertest(app).post("/api/auth/register").send({
        firstName: "duplicateFirstName",
        lastName: "duplicateLastName",
        email: "duplicate@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
    it("Register with a missing field : POST /api/auth/register", async () => {
      const useData = [
        {
          firstName: "kamal",
          lastName: "",
          email: "test@gmail.com",
          password: "password",
        },
        {
          firstName: "",
          lastName: "kamal",
          email: "test@gmail.com",
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
          email: "test@gmail.com",
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
  describe("User Login ", () => {
    // when the correct credentials are passed
    it("User login : POST /api/auth/login", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      token = response.body.token;
    });
    it("User login invalid credentials : POST /api/auth/login", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "testx@gmail.com",
        password: "passwordx",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("User Data Update", () => {
    it("Update User Data update : PUT /api/auth/updateMe ", async () => {
      const response = await supertest(app)
        .put("/api/auth/updateMe")
        .set("Authorization", `Bearer ${token}`)
        .send({
          firstName: "UpdateFirstName",
          lastName: "UpdateLastName",
        });
      expect(response.statusCode).toBe(201);
    });
    it("Change Password : PUT /api/auth/changePassword", async () => {
      const response = await supertest(app)
        .put("/api/auth/changePassword")
        .set("Authorization", `Bearer ${token}`)
        .send({
          oldPassword: "password",
          newPassword: "password",
        });
      expect(response.statusCode).toBe(201);
    });
    it("Get User Data : GET /api/auth/getMe", async () => {
      const response = await supertest(app)
        .get("/api/auth/getMe")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("firstName");
      expect(response.body).toHaveProperty("lastName");
      expect(response.body).toHaveProperty("email");
    });
    it("Make User Admin : PUT /api/auth/makeMeAdmin", async () => {
      const response = await supertest(app)
        .put("/api/auth/makeMeAdmin")
        .set("Authorization", `Bearer ${token}`);

      //come up with a better way to test this (route is working)
      try {
        expect(response.statusCode).toBe(201);
      } catch {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ msg: "User already is an admin" });
      }
    });
    it("Update Profile Image : PUT /api/auth/updateProfileImage ", async () => {
      const response = await supertest(app)
        .put("/api/auth/updateProfileImage")
        .set("Authorization", `Bearer ${token}`)
        .attach("imageURL", "__test__/testImages/testImage.jpg");
      expect(response.statusCode).toBe(201);
    });
  });
});

