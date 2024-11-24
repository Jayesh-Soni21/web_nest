import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants}= useSelector(store=>store.application)
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          // Filter only applicants with "accepted" or "pending" status
          const filteredApplicants = res.data.job.applications.filter(
            (item) => item.status === "accepted" || item.status === "pending"
          );
  
          // Create a new object containing the filtered applications
          const filteredJobData = {
            ...res.data.job,
            applications: filteredApplicants,
          };
  
          // Dispatch the filtered data to the store
          dispatch(setAllApplicants(filteredJobData));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [dispatch,params.id]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">Applicants {applicants.applications.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
