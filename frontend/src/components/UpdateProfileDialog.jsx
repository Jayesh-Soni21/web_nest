import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setVerifiedUser } from "@/redux/authSlice";
function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { verifiedUser } = useSelector((store) => store.auth);
  const dispatch=useDispatch();
  const [input, setInput] = useState({
    fullName: verifiedUser?.fullName,
    email: verifiedUser?.email,
    phoneNumber: verifiedUser?.phoneNumber,
    bio: verifiedUser?.profile?.bio,
    skills: verifiedUser?.profile?.skills?.map((skill) => skill),
    file: verifiedUser?.profile?.resume,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler=(e)=>{
     const file=e.target.files?.[0];
     setInput({...input,file});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData= new FormData();
    formData.append("fullName",input.fullName);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
        formData.append("file",input.file)
    }
    try {
        setLoading(true);
        const res= await axios.put(`${USER_API_END_POINT}/profile/update`,formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true,
        });
        if(res.data.success){
            dispatch(setVerifiedUser(res.data.verifiedUser));
            toast.success("profile updated successfully"); 
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    } finally{
        setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogTitle>Update Profile</DialogTitle>
          <DialogHeader>
            <form onSubmit={submitHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullName" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    className="col-span-3"
                    value={input.fullName}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    className="col-span-3"
                    value={input.email}
                    onChange={changeEventHandler}
                    type="email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    className="col-span-3"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right">
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    className="col-span-3"
                    value={input.bio}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="skills" className="text-right">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    className="col-span-3"
                    value={input.skills}
                    onChange={changeEventHandler}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Resume
                  </Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    onChange={fileChangeHandler}
                    accept="application/pdf"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                {loading ? (
                  <Button className="w-full my-4">
                    <Loader2 mr-2 h-4 w-4 animate-spin /> Please Wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full my-4">
                    Update
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
