import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Unauthorized Request !");
  try {
    console.log("the token", token);
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "66ba64c80fb362e9ea4e7883";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    if (!token) throw new UnauthenticatedError("Unauthorized Request !");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User , Read Only !!");
  next();
};
