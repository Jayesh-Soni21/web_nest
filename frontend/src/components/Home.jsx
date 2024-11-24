import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Home() {
 useGetAllJobs();
 const {verifiedUser}= useSelector(store=>store.auth);
 const navigate=useNavigate();
 useEffect(()=>{
  if(!verifiedUser){
    navigate("/login")
  }
  if(verifiedUser?.role==="recruiter"){
    navigate("/admin/companies");
  }
 })
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home