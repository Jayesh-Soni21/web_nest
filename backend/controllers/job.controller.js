import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
    } = req.body;
    const userId = req.id;
//     if (!title) console.log("Title is missing");
// if (!description) console.log("Description is missing");
// if (!requirements) console.log("Requirements are missing");
// if (!salary) console.log("Salary is missing");
// if (!location) console.log("Location is missing");
// if (!jobType) console.log("Job type is missing");
// if (!experienceLevel) console.log("Experience is missing");
// if (!position) console.log("Position is missing");
// if (!company) console.log("Company ID is missing");
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    // const checkJob= await Job.find({company});
    // console.log(checkJob)
    // if(checkJob){
    //     return res.status(400).json({
    //         message:"job already exists",
    //         success:false
    //     })
    // }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company,
      created_by: userId,
    });
    
    return res.status(200).json({
      message: "job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log("kuch to dikkat hai");
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate("company").populate("applications").sort({createdAt:-1});
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Jobs found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//getting jobs for students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("applications");
    if (!job) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "jobs found",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//getting jobs created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate("company");
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "jobs found",
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
