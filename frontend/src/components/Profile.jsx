import  { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const Profile = () => {
  const [open,setOpen]=useState(false);
  const {verifiedUser}=useSelector(store=>store.auth);
  let isResume
  if(verifiedUser)
  isResume=true;
else{
  isResume=false
}
const dispatch=useDispatch();
useEffect(()=>{
  const fetchAppliedJobs= async()=>{
      try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
        if(res.data.success){
          dispatch(setAllAppliedJobs(res.data.application));
        }

      } catch (error) {
        console.log(error)
      }
  }
  fetchAppliedJobs();
},[dispatch])

    
  
  return (
    
    <div>
      <Navbar />
    
      
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 rounded-full">
              <AvatarImage className="h-20 w-20 rounded-full" src={verifiedUser.profile.profilePhoto} />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{verifiedUser?.fullName}</h1>
              <p>
              {verifiedUser?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={()=>setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{verifiedUser?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{verifiedUser?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="my-2">Skills</h1>
          <div className="flex items-center gap-1">
          {verifiedUser?.profile?.skills.length !== 0 ? (
            verifiedUser?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
          ) : (
            <span>No skills available</span> 
          )}
            
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume? <a target="blank" href={verifiedUser?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{verifiedUser?.profile?.resumeOriginalName}</a> : <span> No resume</span>
          }
          
        </div>

      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          {/* application table */}
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
