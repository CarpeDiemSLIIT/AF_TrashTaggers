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

let token = "";
describe("Admin /api/posts", () => {
  //Admin login in order to get posts
  describe("Admin login ", () => {
    it("Admin login : POST /api/auth/login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      token = response.body.token;
    });
  });

  //get all post by admin
  describe("Admin Get all POST ", () => {
    test("Admin  getAllPost : GET /api/posts/all/admin", async () => {
      const res = await supertest(app)
        .get("/api/posts/all/admin")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //approve a new post
  describe("Admin approve POST", () => {
    test("Admin  approvePost : PATCH /api/posts/approve/:id", async () => {
      const res = await supertest(app)
        .patch("/api/posts/approve/6457b234ccf2dad9353b3b06")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //reject a new post
  describe("Admin reject POST", () => {
    test("Admin rejectPost : PATCH /api/posts/reject/:id", async () => {
      const res = await supertest(app)
        .patch("/api/posts/reject/6457b3150f1df89c17750342")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
