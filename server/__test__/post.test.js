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

describe("Post Api /api/posts", () => {
  describe("CRUD", () => {
    it.todo("Add new post POST /api/posts");
    it.todo("Get all posts GET /api/posts");
    it.todo("Update post PUT /api/posts/:id");
    it.todo("Delete post DELETE /api/posts/:id");
  });
  describe("Post Vote", () => {
    it.todo("Upvote post PUT /api/posts/upvote/:id");
    it.todo("Downvote post PUT /api/posts/downvote/:id");
  });
});
