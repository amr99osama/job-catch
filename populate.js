import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobModel.js";
import User from "./models/userModel.js";
try {
  await mongoose.connect(process.env.MONGO_URL);
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await User.findOne({ email: "amrosama075@gmail.com" });

  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mock-data.json", import.meta.url))
  );
  console.log("the json jobs", jsonJobs);
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
