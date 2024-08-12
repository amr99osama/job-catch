// will handle all try and catch errors
import "express-async-errors";
import * as dotenv from "dotenv";

import express from "express";
import morgan from "morgan";
import jobRouter from "./routers/jobRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

/// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

/// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandleMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
/// mongoose
import mongoose from "mongoose";
/// import cookie parser
import cookieParser from "cookie-parser";
// generate express validator
// import { body, validationResult } from "express-validator";

/// import cloudinary
import cloudinary from "cloudinary";

const app = express();
/// Built in Middleware to accept Json
app.use(express.json());
// cookie parser built-in middleware
app.use(cookieParser());

// /// promise
// try {
//   const response = await fetch(
//     "https://www.course-api.com/react-useReducer-cart-project"
//   );
//   const cartData = await response.json();
//   //console.log(cartData);
// } catch (error) {
//   //console.log(error);
// }

/// .env for dotenc
dotenv.config();

// for directory
const __dirname = dirname(fileURLToPath(import.meta.url));

/// checkers for .env variables
if (process.env.NODE_ENV === "development") {
  // morgan use
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
  res.send("Hello Project !!");
});

/// method for middleware : POST
// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   //console.log(req.body);
//   res.json({
//     message: `Data Received ${name}`,
//   });
// });

/// request to get all  job's
// app.get("/api/v1/jobs");

// /// request to het single job (using ID)
// app.get("/api/v1/jobs/:id");

// /// request to create new job

// app.post("/api/v1/jobs");

// /// request to edit new job

// app.patch("/api/v1/jobs/:id");

// /// request to delete new job

// app.delete("/api/v1/jobs/:id");
/// for user

app.use("/api/v1/user", authenticateUser, userRouter);

app.use("/api/v1/jobs", authenticateUser, jobRouter);

/// for user router
app.use("/api/v1/auth", authRouter);

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });

//// not found and error routes
app.use("*", (req, res) => {
  res.status(404).json({ Msg: "Not Found !" });
});

app.use(errorHandlerMiddleware);

/// for all server errors ..
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ Msg: "Something Went Wrong !" });
});

/// for port .. according to env port
const port = process.env.PORT || 5100;
// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/// mongoDB Connection
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server Running on PORT ${port}... `);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

/// app validator for express
