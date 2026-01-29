import React, { useEffect, useState } from 'react'
import {
  IconUser,
  IconMail,
  IconPhone,
  IconLock,
  IconCalendarStats,
  IconCurrencyRupee,
  IconCertificate,
  IconBriefcase,
  IconStars,
  IconClockHour4
} from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button,TextInput,TagsInput, FileButton,Text,Fieldset, Loader,NumberInput  } from '@mantine/core';
import styles from './AdminPanelDrManage.module.css'
import { DoctorsCard } from '../DoctorsCard/DoctorsCard'
import CardSkeleton from '../SimmerEffect/CardSkeleton'
import { toast } from 'react-toastify';

const AdminPanelDrManage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false)
  const [apiCaller, setApiCaller] = useState("")

  const [name, setName] = useState("");
  const [age, setAge] = useState("")
  const [contact, setContact] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("")
  const [profile, setProfile] = useState(null)
  const [degrees, setDegrees] = useState("")
  const [experience, setExperience] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [fees, setFees] = useState("")
  const [slots, setSlots] = useState([])
  const headers = {headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}}
  const SkeletonArray = [1,2,3,4];

  const formSubmission = async()=>{
    setLoading(true)
    try{
      if (password !== confirmPass) {
      return toast.error("Passwords do not match");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("degrees", degrees);
    formData.append("experience", experience);
    formData.append("consultationFee", fees);
    formData.append("age",age);
    formData.append("contact", contact)

    expertise.forEach((item) =>
      formData.append("expertise", item)
    );

    slots.forEach((slot) =>
      formData.append("slots", slot)
    );

    if (profile) {
      formData.append("profileImage", profile);
    }
       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/admin/add-doctor`,formData, headers)
       setApiCaller(res.data.doctor.name)
       toast.success(`Dr. ${res.data.doctor.name} added successfully`)
        setName("");
        setAge("")
        setContact("")
        setEmail("");
        setPassword("");
        setConfirmPass("")
        setProfile(null)
        setDegrees("")
        setExperience('');
        setExpertise([]);
        setFees("")
        setSlots([])
       close();
    }catch(err){
       toast.error(err.response?.data?.msg || "Something went wrong")
    }finally{
      setLoading(false)
    }
  }

  const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const handleDoctors = async()=>{
       setLoading(true)
      try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/getAllDoctors`,headers)
      setDoctors(res.data)
      }catch(err){
        localStorage.removeItem("token");
        navigate('/login')
        toast.error(err.response?.data?.msg || "Failed in getting all Doctors")
      }finally{
         setLoading(false)
      }
    }
    handleDoctors();
  },[apiCaller])

  return (
    <div className={styles.manageDrPage}>
        <div className={styles.mainCard}>
                    <div className={styles.h3}>Wellcome</div>
                    <div className={styles.h1}>Admin</div>
                    <div className={styles.p}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio explicabo sunt ad placeat amet aperiam ipsam, eveniet vitae cupiditate maxime!</div>
                    <button variant="default" onClick={open}>+ Add Doctor</button>
        </div>
        <Modal size={'1000'} opened={opened} onClose={close} title="Doctor Registration">
        <Fieldset mb={15} legend="Personal Details">
           <div className={styles.inputWrapper}>
              <TextInput
              onChange={(e)=>setName(e.target.value)}
              value={name}
              leftSectionPointerEvents="none"
              leftSection={<IconUser size={16} />}
              label="Name of Doctor"
              placeholder="Please enter name"
              style={{width:"100%"}}
             />
             <TextInput
              onChange={(e)=>setAge(e.target.value)}
              value={age}
              leftSectionPointerEvents="none"
              leftSection={<IconCalendarStats size={16} />}
              label="Age of Doctor"
              placeholder="Please enter age"
              style={{width:"100%"}}
             />
             <TextInput
              onChange={(e)=>setContact(e.target.value)}
              value={contact}
              leftSectionPointerEvents="none"
              leftSection={<IconPhone size={16} />}
              label="Contact no. of Doctor"
              placeholder="Please enter contact no."
              style={{width:"100%"}}
             />
          </div>
        </Fieldset>
        <Fieldset mb={15} legend="Credentails Details">
          <div className={styles.inputWrapper} >
              <TextInput
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              leftSectionPointerEvents="none"
              leftSection={<IconMail size={16} />}
              label="Email of Doctor"
              placeholder="Please enter email"
              style={{width:"100%"}}
             />
             <TextInput
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              leftSectionPointerEvents="none"
              leftSection={<IconLock size={16} />}
              label="Password"
              placeholder="Please enter password"
              style={{width:"100%"}}
              />
            <TextInput
              onChange={(e)=>setConfirmPass(e.target.value)}
              value={confirmPass}
              leftSectionPointerEvents="none"
              leftSection={<IconLock size={16} />}
              label="Confirm Password"
              placeholder="Re-enter password"
              error=""
              style={{width:"100%"}}
              />
          </div>
        </Fieldset>
        <Fieldset mb={15} legend="Professional Details">
            <div className={styles.inputWrapper}>
            <TextInput
              onChange={(e)=>setDegrees(e.target.value)}
              value={degrees}
              leftSectionPointerEvents="none"
              leftSection={<IconCertificate size={16} />}
              label="Doctor Degrees"
              placeholder="Please enter degrees"
              style={{width:"100%"}}
              mb={10}
             />
             <NumberInput
              value={experience} 
              onChange={setExperience} 
              leftSection={<IconBriefcase size={16} />}
              label="Doctor Experience"
              placeholder="Please enter experience"
              style={{width:"100%"}}
              mb={10}
             />
             <TagsInput
              label="Doctor Expertise"
              placeholder="Pick or write Expertise"
              data={['Orthologist','Physician','Neurologist','Surgeon', 'Dentist','Psychiatrist', 'Cardiologist']}
              value={expertise}
              onChange={setExpertise}
              leftSection={<IconStars size={16} />}
              style={{width:"100%"}}
              mb={10}
             />
            </div>
            <div className={styles.inputWrapper}>
              <TextInput
                onChange={(e)=>setFees(e.target.value)}
                value={fees}
                leftSectionPointerEvents="none"
                leftSection={<IconCurrencyRupee size={16} />}
                label="Consultation Fee"
                placeholder="Please enter amount"
                style={{width:"100%"}}
              />
              <TagsInput
                label="Available Slots"
                placeholder="Pick or write Expertise"
                leftSection={<IconClockHour4 size={16} />}
                data={['10:00AM','10:15AM','10:30AM','10:45AM','11:00AM','01:00PM', '1:15PM', '01:30PM']}
                value={slots}
                onChange={setSlots}
                style={{width:"100%"}}
              />
            </div>
        </Fieldset> 
             <FileButton onChange={setProfile} accept="image/png,image/jpeg">
               {(props) => <Button {...props}>Upload image</Button>}
             </FileButton>
             {profile && (
             <Text size="sm" ta="center" mt="sm">
                Picked file: {profile.name}
             </Text>
              )}
            <button onClick={formSubmission} className={styles.addDoctor}>{loading?<Loader></Loader>:"ADD DOCTOR"}</button>
        </Modal>
        <div className={styles.h1}>All Doctors</div>
        <div className={styles.doctors}>
             {loading? SkeletonArray.map((_,index)=><CardSkeleton key={index}></CardSkeleton>):doctors.length>0 ? doctors.map((doctor)=>{
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
                          }):<div style={{color:"red"}}>No Doctor Available !</div>}
        </div>
    </div>
  )
}

export default AdminPanelDrManage