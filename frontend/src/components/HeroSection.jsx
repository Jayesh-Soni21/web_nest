import { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const dispatch= useDispatch()
  const navigate=useNavigate();
  const [query,setQuery]=useState("");
  const searchJobHandler= ()=>{
      dispatch(setSearchedQuery(query));
      navigate('/browse');
  }
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
      <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Find Your Future, Fast and Easy! </span>
      <h1 className='text-5xl font-bold'>Search, Apply and & <br/> Get Your <span className='text-[#6A38C2]'> Dream Jobs</span></h1>
      <p><span className='text-red-600 font-bold'>WorkNest</span> connects talented job seekers with top employers,<br/> offering seamless applications and tailored job recommendations.</p>
      <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
        <input type="text"
        onChange={(e)=>setQuery(e.target.value)}
        placeholder='Find Your Dream Jobs'
        className='outline-none border-none w-full'
        />
        <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
          <Search className='h-5w-5'/>
        </Button>
      </div>
      </div>
      
    </div>
  )
}

export default HeroSection
