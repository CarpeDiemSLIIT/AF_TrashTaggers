import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import firebase from "firebase/compat/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// local imports
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import postsRouter from "./routes/posts.js";

import { verifyTokenUser } from "./middleware/authUserToken.js";
import { verifyTokenAdmin } from "./middleware/authAdminToken.js";

import { addNewPost, approvePost, rejectPost } from "./controllers/posts.js";
import { updatePostImage } from "./controllers/posts.js";
import { updateImage } from "./controllers/auth.js";

/* configurations */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY, //eslint-disable-line no-undef
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, //eslint-disable-line no-undef
  projectId: process.env.FIREBASE_PROJECT_ID, //eslint-disable-line no-undef
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, //eslint-disable-line no-undef
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, //eslint-disable-line no-undef
  appId: process.env.FIREBASE_APP_ID, //eslint-disable-line no-undef
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
  },
});

const imageHandlingMiddleware = async (req, res, next) => {
  try {
    const storageRef = ref(storage, `TrashTaggers/${req.file.originalname}`);
    await uploadBytes(storageRef, req.file.buffer);
    req.body.imageURL = await getDownloadURL(
      ref(storage, `TrashTaggers/${req.file.originalname}`)
    );
    next();
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
};
//routes with images
app.post(
  "/api/posts/add",
  verifyTokenUser,
  uploader.single("imageURL"),
  imageHandlingMiddleware,
  addNewPost
);
app.put(
  "/api/posts/updatePostImage/:id",
  verifyTokenUser,
  uploader.single("imageURL"),
  imageHandlingMiddleware,
  updatePostImage
);
// profile image update
app.put(
  "/api/auth/updateProfileImage",
  verifyTokenUser,
  uploader.single("imageURL"),
  imageHandlingMiddleware,
  updateImage
);
/* Routes */
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

//route to approve a post
app.patch("/api/posts/approve/:id", verifyTokenAdmin, approvePost);

//route to reject a post
app.patch("/api/posts/reject/:id", verifyTokenAdmin, rejectPost);

/* Mongoose setup */
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 6001;
mongoose // eslint-disable-next-line no-undef
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
