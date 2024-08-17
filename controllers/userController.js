import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({
    users,
    jobs,
  });
};

export const updateUser = async (req, res) => {
  /// update user without password
  const newUser = { ...req.body };
  delete newUser.password;
  // we can update the user without updating an image
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  //console.log(obj);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  console.log("the updated user", updateUser);
  // if there's updated user and want to upload new image and remove the old one
  if (req.file && updateUser.avatarPublicId) {
    // remove the old ASSET IN CLOUDINARY
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ Msg: updatedUser });
};
