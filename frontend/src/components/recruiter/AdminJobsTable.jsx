import  { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const navigate = useNavigate();
  const { searchJobByText = "" } = useSelector((store) => store.job); // Default value
  const { AllAdminJobs = [] } = useSelector((store) => store.job); // Default to an array

  // Log Redux state
  console.log("Redux State:", { AllAdminJobs, searchJobByText });

  // Use useMemo to filter jobs efficiently
  const filterJobs = useMemo(() => {
    const filtered = AllAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    console.log("Filtered Jobs:", filtered);
    return filtered;
  }, [AllAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A List of your recently Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => {
            console.log("Rendering Job:", job); // Debug log
            return (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>

                <TableCell>
                  {job.createdAt
                    ? job.createdAt.split("T")[0]
                    : "No Date Available"}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
