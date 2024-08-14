import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
// import { NotFoundError } from "../errors/customErrors.js";
// nano id for generating a new ID
import mongoose from "mongoose";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

let jobs = [
  {
    id: nanoid(),
    company: "Apple",
    position: "Front-End",
  },
  {
    id: nanoid(),
    company: "Google",
    position: "UI-UX",
  },
  {
    id: nanoid(),
    company: "Meta",
    position: "Back-End",
  },
];
/// request to get all  job's

export const getAllJobs = async (req, res) => {
  // get all jobs
  // now adding createdBy to check the user with token and authorized access
  const jobs = await Job.find({ createdBy: req.user.userId });
  console.log(jobs);
  return res.status(StatusCodes.OK).json(jobs);
};

/// request to het single job (using ID)

export const getJob = async (req, res) => {
  //console.log(req.user.role);
  const { id } = req.params;
  //console.log(id);
  const job = await Job.findById(id);
  // console.log(job);
  return res.status(StatusCodes.OK).json(job);
};

/// request to create new job

export const createNewJob = async (req, res) => {
  /// now check the authorized user to create
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
  // if (!company || !position) {
  //   res.status(400).json({ Msg: "Please Provide Company and Position" });
  // }

  // res.status(500).json({ Msg: "Server Error Occured !" });

  // const id = nanoid(10);
  // const job = { id, company, position };
  // jobs.push(job);
  // want to create new job
};

/// request to edit new job

export const editJob = async (req, res) => {
  // const { company, position } = req.body;
  // if (!company || !position) {
  //   return res.status(400).json({ Msg: "please provide company and position" });
  // }
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  // const job = jobs.find((job) => job.id === id);
  // if (!updatedJob) {
  //   throw new NotFoundError(`This Job with id ${id} is not found !`);
  // }

  // job.company = company;
  // job.position = position;
  res
    .status(StatusCodes.OK)
    .json({ msg: "job Updated Successfully !", job: updatedJob });
};

/// request to delete new job
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  // const job = jobs.find((job) => job.id === id);
  // if (!removedJob) {
  //   throw new NotFoundError(`This Job with id ${id} is not found !`);
  // }
  // const newJobList = jobs.filter((job) => job.id === id);
  // jobs = newJobList;
  res.status(StatusCodes.OK).json({ msg: "job Deleted ! ", job: removedJob });
};

/// request for stats
export const showStats = async (req, res) => {

  // let monthlyApps = [
  //   {
  //     date: "May 23",
  //     count: 12,
  //   },
  //   {
  //     date: "Jun 23",
  //     count: 10,
  //   },
  //   {
  //     date: "July 23",
  //     count: 8,
  //   },
  //   {
  //     date: "Aug 23",
  //     count: 17,
  //   },
  // ];
  let stats = await Job.aggregate([
    {
      // get all jobs are created by current user
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: '$jobStatus', count: { $sum: 1 }
      },
    }
  ]);

  /// turn this array into object using reduce method
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {})
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  console.log(stats);



  /// monthly apps 
  let monthlyApps = await Job.aggregate([
    {
      // get all jobs are created by current user
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': -1, "_id.month": -1 }
    },
    {
      $limit: 6
    }
  ])
  const defaultMonthlyApps = monthlyApps.map(item => {
    return {
      date: `${dayjs().month(item._id.month - 1).format('MMM')} ${String(item._id.year).slice(-2)}`,
      count: item.count
    };
  }).reverse()
  console.log(defaultMonthlyApps)
  res.status(StatusCodes.OK).json({ defaultStats, defaultMonthlyApps });
};
