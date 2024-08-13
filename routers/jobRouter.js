import {
  getAllJobs,
  getJob,
  createNewJob,
  deleteJob,
  editJob,
  showStats,
} from "../controllers/jobControllers.js";
import { Router } from "express";
import {
  validateIdParam,
  validateJobInput,
} from "../middlewares/validationMiddleware.js";
import { checkTestUser } from "../middlewares/authMiddleware.js";
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
router
  .route("/")
  .get(getAllJobs)
  .post(checkTestUser, validateJobInput, createNewJob);
router.route("/stats").get(showStats);
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkTestUser, validateIdParam, validateJobInput, editJob)
  .delete(checkTestUser, validateIdParam, deleteJob);

export default router;
