import React from 'react'
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Button,
  SimpleGrid,
  Box,
  Modal,TextInput,TagsInput
} from "@mantine/core";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconAt,
  IconCalendarStats,
  IconClock,
} from "@tabler/icons-react";
import { Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState,useEffect } from "react";
import PrimarySearchAppBar from '../../Components/NavBar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { LoadingOverlay} from '@mantine/core';



const DoctorSpecific = () => {
  

  const [ptName, setPtName] = useState("")
  const [ptEmail, setPtEmail] = useState("")
  const [ptPhone, setPtPhone] = useState("")
  const [ptCareOf, setPtCareOf] = useState("")
  const [ptAge, setPtAge] = useState("");
  const [ptAddress, setPtAddress] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [apiCaller, setApiCaller] = useState("")
  const [addSlots, setAddSlots] = useState([])

  const params = useParams()
  const doctorId = params.id
  const [loading, setLoading] = useState(false)
  const [opened, { open:openModal, close:closeModal }] = useDisclosure(false);
  const [openedSlotsModal, { open:openSlotsModal, close:closeSlotsModal }] = useDisclosure(false);
  const [searchValue, setSearchValue] = useState('');
  const [visible, { open:openLoaderOverlay, close:closeLoaderOverlay }] = useDisclosure(false);
  const user = JSON.parse(localStorage.getItem("user"))
  const userRole = user.role
  
   const payload = {ptName, ptEmail, ptPhone, ptCareOf, ptAge, ptAddress, selectedSlot, doctorId} 
  const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
  const [profile, setProfile] = useState([])
  
    useEffect(()=>{
     openLoaderOverlay()
      const getProfile = async()=>{
        try{
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/doctor/specific/${doctorId}`, headers)
          setProfile(res.data)
        }catch(err){
          toast.error(err.response?.data?.msg || "Something Went wrong")
        }
        finally{
          closeLoaderOverlay()
        }
      }
      getProfile()
    },[apiCaller])
    const slots = profile.doctorProfile?.slots

    const handleAppointment = async()=>{
      setLoading(true)
        try{
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/app/createAppointment`,payload, headers)
          setApiCaller(res.data._id)
          setPtName("")
          setPtEmail("") 
          setPtPhone("") 
          setPtCareOf("")
          setPtAge("") 
          setPtAddress("")
          
          toast.success("Appointment send Successfully Please wait for approval")
        }catch(err){
          toast.error(err.response?.data?.msg || "Error in Catching error")
        }finally{
          setLoading(false)
          closeModal()
        }
    }
  
    const handleAddSlots = async()=>{
      setLoading(true)
      try{
        const res = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/admin/doctor/update-slots/${doctorId}`,{slots:addSlots} ,headers)
        toast.success(res.data.msg)
        setApiCaller(res.data.msg)
      }catch(err){
        toast.error(err.response.data.msg || "Catching error Problem")
      }finally{
        setLoading(false)
        closeSlotsModal()
      }
    }
    
  return (
    <>
    <PrimarySearchAppBar></PrimarySearchAppBar>
           <Container py={90} size="xl" my="md" pos="relative">

            {/* LoaderOverlay */}
             <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: 'pink', type: 'bars' }}
        />
      {/* ================= Upper Section ================= */}
      <Card withBorder radius="md" p="lg">
        <Grid gutter="lg">
          {/* Left: Doctor Image */}
          <Grid.Col span={{ base: 12, md: 4 }} style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src={`${import.meta.env.VITE_BACKEND_URI}${profile.doctorProfile?.profileImage}`}
              w={280}
              // h={280}
              radius="md"
              fit="cover"
            />
          </Grid.Col>
      
          {/* Right: Doctor Details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Group justify="space-between">
              <Title order={3}>{profile.name}</Title>
              <Badge px="md" py="md" color="green">Available</Badge>
            </Group>

            <Text mt="xs" c="dimmed">
              {profile.doctorProfile?.expertise.map((e)=>{
                return <span style={{margin:"0px 7px"}}>{e}</span>
              })} • {profile.doctorProfile?.experience}
            </Text>

            <Group mt="md" spacing="xl">
              <Group>
                <IconUser size={18} />
                <Text size="sm">500+ Patients</Text>
              </Group>

              <Group>
                <IconClock size={18} />
                <Text size="sm">Mon – Sat (9 AM – 5 PM)</Text>
              </Group>
            </Group>

            <Text mt="md" size="sm">
              Dr. Rohit Agrawal is a highly experienced cardiologist specializing
              in heart disease diagnosis and preventive care.
            </Text>
          </Grid.Col>
        </Grid>
      </Card>

      {/* ================= Lower Section ================= */}
      <Card withBorder radius="md" mt="lg" p="lg">
        <Title order={4} mb="md">
          Available Slots
        </Title>

        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
          {slots?.length >0 ? slots.map((slot) => (
            <Button
              key={slot}
              variant={selectedSlot === slot ? "filled" : "outline"}
              onClick={() => {
                setSelectedSlot(slot) 
              }}
            >
              {slot}
            </Button>
          )): "Currently no Slots Available"}
        </SimpleGrid>
      </Card>

      {/* ================= Floating Button ================= */}
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
        style={{width:"100%",display:"flex", justifyContent:"space-between" , marginTop:"30px"}}
      >
    <Modal zIndex={12000} opened={opened} onClose={closeModal}  styles={{ title: {fontSize: "22px",fontWeight: 600,},}} title="Fill Patient Details" centered>
              <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconUser size={16} />}
                 label="Patient Full Name"
                placeholder="Enter full name"
                mb={10}
                onChange={(e)=>setPtName(e.target.value)}
                value={ptName}
              />
              
               <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconMail size={16} />}
                 label="Patient email"
                placeholder="@gmail.com"
                 mb={10}
                 onChange={(e)=>setPtEmail(e.target.value)}
                 value={ptEmail}
              />
              <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconPhone size={16} />}
                 label="Patient Phone no."
                placeholder="+91"
                 mb={10}
                 onChange={(e)=>setPtPhone(e.target.value)}
                 value={ptPhone}
              />
               <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconCalendarStats size={16} />}
                 label="Patient Age"
                placeholder="Enter patient age"
                 mb={10}
                 onChange={(e)=>setPtAge(e.target.value)}
                 value={ptAge}
              />
              <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconUser size={16} />}
                 label="Patient Father's name or C/O"
                placeholder="Enter name"
                 mb={10}
                 onChange={(e)=>setPtCareOf(e.target.value)}
                 value={ptCareOf}
              />
               <TextInput
                leftSectionPointerEvents="none"
                 leftSection={<IconAt size={16} />}
                 label="Patient Address"
                placeholder="Enter patient full address"
                 mb={30}
                 onChange={(e)=>setPtAddress(e.target.value)}
                 value={ptAddress}
              />
              <Button onClick={handleAppointment} mb={10} fullWidth>{loading?<Loader color="white" size={25}></Loader>:"Get Appointment"}</Button>
               </Modal>
      <Modal  opened={openedSlotsModal} onClose={closeSlotsModal} title="Add Slots" centered>
         <TagsInput
            comboboxProps={{
              position: "top",     // 👈 Opens above
              middlewares: { flip: false, shift: false } // Prevent auto reposition
              }}
          label="Press Enter to submit a tag"
          placeholder="Enter tag"
         searchValue={searchValue}
         onSearchChange={setSearchValue}
         data={["09:00AM","09:15AM","09:30AM","10:00AM","10:15AM","10:30AM","01:10PM","04:15PM",]}
         onChange={setAddSlots}
         />
         <Button mt={20} fullWidth onClick={handleAddSlots}>{loading?<Loader color="white" size={25}></Loader>:"Add Slots"}</Button>
      </Modal>
        {userRole==="admin"?<Button onClick={openSlotsModal}>Add slots</Button>:""}
        <Button onClick={openModal} size="lg" radius="xl" disabled={!selectedSlot}>
           Book Appointment
        </Button>
      </Box>
    </Container>
    <Footer></Footer>
    </>
  )
}

export default DoctorSpecific