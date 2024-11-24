import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const {verifiedUser}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  useEffect(()=>{
    if(verifiedUser===null || verifiedUser.role!=='recruiter'){
        navigate("/");
    }
  },[navigate,verifiedUser]);
  return(
    <>
    {children}
    </>
  )
}

export default ProtectedRoute
