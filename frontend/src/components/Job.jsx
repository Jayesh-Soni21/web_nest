
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


import { AvatarImage } from "./ui/avatar";

const Job = ({job}) => {
  const navigate=useNavigate()
  const JobId=job._id;
  
  
  const daysAgo= (mongodbTime)=>{
      const createdAt= new Date(mongodbTime);
      const currentTime= new Date();
      const timeDifference=currentTime-createdAt;
      return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 ">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgo(job?.createdAt)===0 ? "today": `${daysAgo(job?.createdAt)} days ago`}</p>
        <Button
          variant="outline"
          className="rounded-full hover:bg-[#F83002]"
          size="icon"
        >
          {/* <Bookmark /> */}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2 ">
      <Button variant="outline" size="icon" className="p-2">
  <Avatar className="w-10 h-10">
    <AvatarImage
      src={job?.company?.logo}
      alt="Bird Logo"
      className="w-full h-full"
    />
  </Avatar>
</Button>        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4 '>
       
      <Badge className="text-blue-700 font-bold " variant="ghost">{job.position}</Badge>
        <Badge className="text-[#F83002] font-bold " variant="ghost">{job.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold " variant="ghost">{job.salary} Lakhs</Badge>

        </div>
        <div className="flex items gap-4 mt-4">
            <Button variant="outline" onClick={()=>navigate(`/description/${JobId}`)} className="bg-[#7209b7] text-white">Details</Button>
            {/* <Button className="bg-[#7209b7]">Save For Later</Button> */}
        </div>
    </div>
  );
};

export default Job;
