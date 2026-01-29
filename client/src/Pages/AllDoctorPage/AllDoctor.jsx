import React from 'react'
import styles from './AllDoctor.module.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardSkeleton from '../../Components/SimmerEffect/CardSkeleton';
import { DoctorsCard } from '../../Components/DoctorsCard/DoctorsCard';
import PrimarySearchAppBar from '../../Components/NavBar/Navbar';
import Footer from '../../Components/Footer/Footer';

const AllDoctor = () => {
    const navigate = useNavigate();
      const [doctors, setDoctors] = useState([])
      const [loading, setLoading] = useState(false)
      const skeletonArray = [1,2,3,4]
      const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      useEffect(() => {
        setLoading(true)
        const handleDoctors = async()=>{
          try{
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getAllDoctors`,headers)
          setDoctors(res.data)
          }catch(err){
            localStorage.removeItem("token");
            navigate('/login')
            toast.error(err.response?.data?.msg)
          }finally{
            setLoading(false)
          }
        }
        handleDoctors();
      },[])
      
  return (
    <>
    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div className={styles.doctorPage}>
        <div className={styles.CardDiv}>
        <div className={styles.mainHeading}>
            <h2>Our top Doctors</h2>
            <p>Find you requirement</p>
        </div>
            {loading ? skeletonArray.map((_,index)=>{
                return <CardSkeleton key={index}></CardSkeleton>
            }):
             doctors.map((doctor)=>{
                 return <DoctorsCard 
                 key={doctor._id}
                 _id = {doctor._id}
                 name={doctor.name}
                 email = {doctor.email}
                 profileImage = {doctor.doctorProfile.profileImage}
                 degrees = {doctor.doctorProfile.degrees}
                 experience = {doctor.doctorProfile.experience}
                 expertise = {doctor.doctorProfile.expertise}
                 slots = {doctor.doctorProfile.slots}
                 fees = {doctor.doctorProfile.consultationFee}
                 ></DoctorsCard>
             })}
    </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default AllDoctor