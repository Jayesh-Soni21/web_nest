import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlist = ["accepted", "rejected"];
const ApplicantsTable = () => {
  const {applicants}=useSelector(store=>store.application);
  const statusHandler= async(status,id)=>{
    try {
      const res= await axios.put(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials:true
      });
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recently applied user</TableCaption>
        <TableHeader>
          <TableRow>
            {/* applicants.applications */}
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            
            { 
              applicants && applicants.applications.filter((item) => {
                return item.status === "accepted" || item.status === "pending";
              })
              .map((item)=>(
                <tr key={item._id}>
                <TableCell>{item.applicant.fullName}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell className="text-blue-600 cursor-pointer">{item.applicant.profile.resume ?
                <a  href={item.applicant.profile.resume} target="_blank">{item.applicant.profile.resumeOriginalName}</a> : <span className="text-black cursor-default">No Resume</span>}</TableCell>
                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                      <PopoverTrigger>
                          <MoreHorizontal/>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                      {shortlist.map((status, index) => {
                    return (
                      <div onClick={()=>statusHandler(status,item._id)} key={index} className="flex w-fit items-center my-2 cursor-pointer">
                        <span>{status}</span>
                      </div>
                    );
                  })}
                      </PopoverContent>
                  </Popover>
                 
                </TableCell>
              </tr>
              ))
            }
           
          </TableBody>
        
      </Table>
    </div>
  );
};

export default ApplicantsTable;
