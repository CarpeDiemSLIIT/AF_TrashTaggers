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
let testPostId = "";
describe("Post Api /api/posts", () => {
  describe("CRUD - Positive", () => {
    // it.todo("Get all posts GET /api/all");
    it("Get all posts GET /api/all", async () => {
      const response = await supertest(app).get("/api/posts/all");
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
    it("Add new post POST /api/posts/add", async () => {
      const response = await supertest(app)
        .post("/api/posts/add")
        .set("Authorization", `Bearer ${token}`)
        .field({
          description: "testDescription",
        })
        .attach("imageURL", "_test_/testImages/testImage.jpg");
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("imageURL");

      testPostId = response.body._id;
    });
    // it.todo("Update post PUT /api/posts/update/:id");
    it("Update post Image PUT /api/posts/updatePostImage/:id", async () => {
      const response = await supertest(app)
        .put(`/api/posts/updatePostImage/${testPostId}`)
        .set("Authorization", `Bearer ${token}`)
        .attach("imageURL", "_test_/testImages/testImage.jpg");
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("imageURL");
    });
    it("Update post Data PUT /api/posts/update/:id", async () => {
      const response = await supertest(app)
        .put(`/api/posts/update/${testPostId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          description: "testDescription",
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("imageURL");
    });
    // it.todo("Delete post DELETE /api/posts/:id/delete");
    it("Delete post DELETE /api/posts/:id/delete", async () => {
      const response = await supertest(app)
        .delete(`/api/posts/${testPostId}/delete`)
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
  describe("Vote and comment", () => {
    // it.todo("Upvote post PUT /api/posts/upvote/:id");
    it("Upvote post PUT /api/posts/upvote/:id", async () => {
      const response = await supertest(app)
        .put(`/api/posts/upvote/${testPostId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });
    it.todo("Downvote post PUT /api/posts/downvote/:id");
    it.todo("Add new comment POST /api/posts/:id/newComment");
  });
  describe("Vote and comment - Negative", () => {
    it.todo("Upvote post PUT /api/posts/upvote/:id");
    it.todo("Downvote post PUT /api/posts/downvote/:id");
    it.todo("Add new comment POST /api/posts/:id/newComment");
  });
});