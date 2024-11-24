import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A List of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length >= 0 ? (
            allAppliedJobs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${item?.status==="rejected" ? 'bg-red-400': item.status==="pending" ? 'bg-gray-400': 'bg-green-400'}`}>{item?.status.toUpperCase()}</Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <span>You Have not Applied to Any Jobs</span>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
