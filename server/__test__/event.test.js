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
let testEventId = "";
describe("Event Api /api/cevents", () => {
  describe("CRUD - Positive", () => {
    // it.todo("Get all posts GET /api/all");
    it("Get all events GET /api/all", async () => {
      const response = await supertest(app).get("/api/cevents/all");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    // to get the token
    it("User login ", async () => {
      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      token = response.body.token;
    });

    // it.todo("Add new post POST /api/posts");
    it("Add new event EVENT /api/cevents/add", async () => {
      const response = await supertest(app)
        .post("/api/cevents/add")
        .set("Authorization", `Bearer ${token}`)
        .field({
          description: "testDescription",
          Title : "TestTitle",
        })
        .attach("imageURL", "_test_/testImages/testImage.jpg");
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("Title");
      expect(response.body).toHaveProperty("imageURL");

      testEventId = response.body._id;
    });
    // it.todo("Update post PUT /api/posts/update/:id");

    it("Update event Data PUT /api/cevents/update/:id", async () => {
      const response = await supertest(app)
        .put(`/api/cevents/update/${testEventId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "testDescription",
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("imageURL");
    });
    // it.todo("Delete post DELETE /api/posts/:id/delete");
    it("Delete event DELETE /api/cevents/:id/delete", async () => {
      const response = await supertest(app)
        .delete(`/api/cevents/${testEventId}/delete`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
  });
  // describe("CRUD - Negative", () => {
  //   it.todo("Get all posts GET /api/all");
  //   it.todo("Add new post POST /api/posts");
  //   it.todo("Update post PUT /api/posts/update/:id");
  //   it.todo("Delete post DELETE /api/posts/:id/delete");
  // });

});