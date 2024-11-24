
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
function Browse() {

  
  useGetAllJobs();
  const {verifiedUser}= useSelector(store=>store.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {allJobs}= useSelector(store=>store.job);
  useEffect(()=>{
    if(!verifiedUser){
      navigate("/login")
      return;
  }
      return ()=>{
        dispatch(setSearchedQuery(""))
      }
  },[dispatch,navigate,verifiedUser])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold tex-xl my-10'>Search Results {allJobs.length}</h1>
        <div className='grid grid-cols-3 gap-4 '>
        {
            allJobs.map((job)=>{
                return (
                    <Job key={job._id} job={job}/>
                )
            })

            
        }
        </div>
        
      </div>
    </div>
  )
}

export default Browse
