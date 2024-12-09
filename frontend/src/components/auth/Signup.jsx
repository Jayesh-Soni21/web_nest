
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
function Signup() {
  const [input,setInput]=useState({
    fullName:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const changeEventHandler=(e)=>{
    setInput({...input,[e.target.name]:e.target.value});
  }
  const { loading,verifiedUser} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const changeFilehandler=(e)=>{
      setInput({...input,file:e.target.files?.[0]});
  }
  const submitHandler= async(e)=>{
      e.preventDefault();
      const formData=new FormData;//FormData is a built-in object that provides a way to easily construct key-value pairs representing form fields and their values. It’s especially useful for handling forms with file uploads, as it automatically handles encoding the form data for multipart/form-data submissions.When you use FormData like new FormData(), you’re creating a blank FormData object where you can manually append fields.
      formData.append("fullName",input.fullName);
      formData.append("email",input.email);
      formData.append("phoneNumber",input.phoneNumber);
      formData.append("password",input.password);
      formData.append("role",input.role);
      if(input.file){
        formData.append("file",input.file)
      }

      try {
        dispatch(setLoading(true))
        //yaha res vaala jo object hai vo hamara response hai jo hme api run krne k baad milta hai res.data se json format me hamara response aa jata hai
        const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          },//multipart refers to a data encoding type that allows you to send multiple pieces of data in a single request, where each part of the message can contain its own headers and content. It's widely used for uploading files along with other form fields in web applications.
          withCredentials:true// withcredentials ko true krke ham request k saath me cookies and all bhi bhej rhe hai for authentiction
        })
        if(res.data.success){
          navigate("/login");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally{
        dispatch(setLoading(false));
      }
  }//yaha pr api call hogi isiliye async function bnaya hai
  useEffect(()=>{
    if(verifiedUser){
      navigate("/");
    }
},[verifiedUser,navigate])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Jayesh"
            value={input.fullName}
            name="fullName"
            onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" placeholder="enter your email" value={input.email} name="email" onChange={changeEventHandler} />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="number" placeholder="Enter your Number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your Password" name="password" value={input.password} onChange={changeEventHandler} />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              className="flex items-center gap-4 my-5"
              defaultValue="option-one"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==='student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role==='recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFilehandler} />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <span>
            Aready have an account?{" "}
            <NavLink to={"/login"}>
              <Button variant="link">Login</Button>
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
