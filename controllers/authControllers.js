import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
/// create new user

export const getAllUsers = async (req, res) => {
  const Users = await User.find({});
  res.status(StatusCodes.OK).json({ Users });
};

export const register = async (req, res) => {
  // first account will be the admin user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  // hashing salt from bcrypt
  const hashedPassword = await hashPassword(req.body.password);

  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ Msg: "User Created Successfully !" });
};
export const login = async (req, res) => {
  /// login auth
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    throw new UnauthenticatedError(
      "Invalid Credentials , Wrong Email Provided !"
    );
  const isPasswordMatch = await comparePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch)
    throw new UnauthenticatedError(
      "Invalid Credentials , Wrong Password Provided !"
    );

  /// create JWT
  const token = createJWT({ userId: user._id, role: user.role });
  // for one-day expiration
  const oneDay = 1000 * 60 * 60 * 24;
  // http-only cookies - not accessible by JS
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged In" });
  // res.json({ token: token });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ Msg: "User Logged Out !" });
};
