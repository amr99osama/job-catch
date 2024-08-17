import {
  getAllJobs,
  getJob,
  createNewJob,
  deleteJob,
  editJob,
} from "../controllers/jobControllers.js";
import { Router } from "express";
import {
  validateIdParam,
  validateJobInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

// for express Router

// import {
//   getAllJobs,
//   getJob,
//   createNewJob,
//   deleteJob,
//   editJob,
// } from "../controllers/jobControllers";

// router.get("/", getAllJobs);
// router.post("/", createNewJob);

/// need to define the validateJobInput middleware for body requests
router.route("/").get(getAllJobs).post(validateJobInput, createNewJob);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(validateIdParam, validateJobInput, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
