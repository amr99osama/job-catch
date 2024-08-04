import {
  register,
  login,
  getAllUsers,
  logout,
} from "../controllers/authControllers.js";
import { Router } from "express";
import {
  validateRegister,
  validateLoginInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();
router.get("/users", getAllUsers);
router.post("/register", validateRegister, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
