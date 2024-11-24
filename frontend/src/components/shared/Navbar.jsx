import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Link2, LogOut, User2 } from "lucide-react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setVerifiedUser } from "@/redux/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verifiedUser } = useSelector((store) => store.auth);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setVerifiedUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Work<span className="text-[#F83002]">Nest</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {verifiedUser && verifiedUser.role === "recruiter" ? (
              <>
                <li>
                  {" "}
                  <NavLink to={"/admin/companies"}>Companies</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to={"/admin/jobs"}>Jobs</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  {" "}
                  <NavLink to={"/"}>Home</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to={"/jobs"}>Jobs</NavLink>
                </li>
                <li>
                  <NavLink to={"/browse"}>Browse</NavLink>
                </li>
              </>
            )}
          </ul>

          {!verifiedUser ? (
            <div className="flex items-center gap-2">
              <NavLink to={"/login"}>
                <Button variant="outline">Login</Button>
              </NavLink>

              <NavLink to={"/signup"}>
                <Button className="bg-[#6A38C2] hover:bg-[#7f5bbc]">
                  Signup
                </Button>
              </NavLink>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={verifiedUser?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={verifiedUser?.profile?.profilePhoto} />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{verifiedUser?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {verifiedUser?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">

                  {
                    verifiedUser && verifiedUser.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        {" "}
                        <NavLink to={"/profile"}>View Profile</NavLink>{" "}
                      </Button>
                    </div>
                    ) 
                  }
                 
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
