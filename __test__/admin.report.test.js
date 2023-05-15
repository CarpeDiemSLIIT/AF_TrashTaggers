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
let tokenUser = "";
describe("Post Api /api/reports", () => {
  //user login
  describe("User Login", () => {
    it("User user login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "testuser@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      tokenUser = response.body.token;
    });
  });

  //Admin login in order to get posts
  describe("Admin login", () => {
    it("Admin login : POST /api/auth/login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      tokenAdmin = response.body.token;
    });
  });

  //user add a report
  describe("User make a report", () => {
    test("User  makeReport : POST /api/reports/add/:pid", async () => {
      const res = await supertest(app)
        .post("/api/reports/add/6457b36461a2bbebf393c688")
        .set("Authorization", `Bearer ${tokenUser}`)
        .send({ reason: "Inappropriate Content" });
      expect(res.statusCode).toBe(201);
    });
  });

  //get all report by admin
  describe("Admin Get all Report ", () => {
    test("Admin  getAllPost : GET /api/reports/all", async () => {
      const res = await supertest(app)
        .get("/api/reports/all")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //resolve a report by admin
  describe("Admin resolve a report (Doing Nothing)", () => {
    test("Admin  resolveReport : PATCH /api/reports/resolve/:pid", async () => {
      const res = await supertest(app)
        .patch("/api/reports/resolve/6457cacc2579a1552c99d31a")
        .set("Authorization", `Bearer ${tokenAdmin}`);
      expect(res.statusCode).toBe(200);
    });
  });

  //resolve a report by admin
  describe("Admin resolve a report (Delete Post) ", () => {
    test("Admin  resolveReport : PATCH /resolve/removePost/:pid", async () => {
      const res = await supertest(app)
        .patch("/api/reports/resolve/removePost/6457b36461a2bbebf393c688")
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({ reportID: "6457caf7023173e4792e1601" });
      expect(res.statusCode).toBe(200);
    });
  });

  //resolve a report by admin
  describe("Admin resolve a report (Ban User) ", () => {
    test("Admin  resolveReport : PATCH /resolve/banCreator/:id", async () => {
      const res = await supertest(app)
        .patch("/api/reports/resolve/banCreator/64579c0dcb6c5fc268f519d0")
        .set("Authorization", `Bearer ${tokenAdmin}`)
        .send({ reportID: "6457cb1ea496b0128e2e34a9" });
      expect(res.statusCode).toBe(200);
    });
  });
});
