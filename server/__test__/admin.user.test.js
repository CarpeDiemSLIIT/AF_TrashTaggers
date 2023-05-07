import supertest from "supertest";
import app from "../app.js";
import connectDB from "../config/db_test.js";
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

let tokenAdmin = "";
describe("Post Api /api/posts", () => {
  //Admin login in order to get users
  describe("Admin login", () => {
    it("Admin login : POST /api/auth/login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "testdev@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      tokenAdmin = response.body.token;
    });
  });

  //Admin suspend user
  describe("Admin suspend User", () => {
    test("Admin  suspendUser : PATCH /api/users/suspendUser/:id", async () => {
      const res = await supertest(app)
        .patch("/api/users/suspendUser/64579bdcd53f762b4415fa4b")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //get all suspend users
  describe("Admin Get all suspend User ", () => {
    test("Admin  getAllSuspendUser : GET /api/users/allSuspend", async () => {
      const res = await supertest(app)
        .get("/api/users/allSuspend")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //Admin suspend user
  describe("Admin reActive User", () => {
    test("Admin  reActiveUser : PATCH /api/users/reActiveUser/:id", async () => {
      const res = await supertest(app)
        .patch("/api/users/reActiveUser/64579bdcd53f762b4415fa4b")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //get all active users
  describe("Admin Get all active User ", () => {
    test("Admin  getAllActiveUser : GET /api/users/all", async () => {
      const res = await supertest(app)
        .get("/api/users/all")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
