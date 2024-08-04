// generate express validator
import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not")) {
          throw new UnauthorizedError("Not Authorized to view this resource");
        }
        // return res.status(400).json({ errors: errorMessages });
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// export const validateTest = withValidationErrors([
//   [
//     body("name")
//       .notEmpty()
//       .withMessage("Name is Required !")
//       .isLength({ min: 3 })
//       .withMessage("Minimum Length of length is 3 Characters ")
//       .trim(),
//   ],
// ]);

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("Company Is Required"),
  body("position").notEmpty().withMessage("Position Is Required"),
  body("jobLocation").notEmpty().withMessage("Job Location Is Required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Status Values"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid Job Type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    // check if this ID user search by is actual mongoo ID
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    // check if this job us already available
    const job = await Job.findById(value);
    console.log(job);
    if (!job) throw new NotFoundError(`no job with id : ${value}`);
    //check wheteher the user is admin or not
    const isAdmin = req.user.role === "admin";
    // check if user is the owner of specific job (createdBy)
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError("Not Authorized to view this resource");
  }),
]);

/// User Register Validation
export const validateRegister = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already Registered");
    }),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Minimum Password Length is 8 Characters"),
]);

/// user login validation
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

/// User Update User Validation
export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email Format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() === req.user.userId) {
        throw new BadRequestError("Email already Registered");
      }
    }),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);
//   body("password")
//     .notEmpty()
//     .withMessage("password is required")
//     .isLength({ min: 8 })
//     .withMessage("Minimum Password Length is 8 Characters"),
// ]);
