
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function LatestJobs() {
  
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2] mx-2">Latest & Top</span>Job Openings
      </h1>
      {/* multiple job cards will be displayed */}
      <div className="grid grid-cols-3 gap-4 my-5 ">
        {allJobs.length <= 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => 
          <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          key={job._id}>
             <LatestJobCards   job={job}/>
            </motion.div>
         )
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
