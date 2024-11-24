import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJob, getJobById, postJob } from "../controllers/job.controller.js";
const router=express.Router();
router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAllJob);
router.get("/getadminjobs",isAuthenticated,getAdminJobs);
router.get("/get/:id",isAuthenticated,getJobById);



export default router;
//  {
//     "title":"frontend developer",
//     "description":"frontend developers needed",
//     "requirements":"reactjs,shadcn",
//     "salary":"12",
//     "location":"Gurugram",
//     "jobType":"Full Time",
//     "experience":0,
//     "position":16,
//     "companyId":"6721dfbbc652c287695b148e"
// }