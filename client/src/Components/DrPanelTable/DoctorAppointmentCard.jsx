import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  SimpleGrid,
  ActionIcon,
  Divider,
  ScrollArea, Modal,
  Loader
} from "@mantine/core";
import {
  IconUser,
  IconPhone,
  IconCalendarTime,
  IconClockHour4,
  IconEye,
  IconFilePlus,
} from "@tabler/icons-react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import DrPrescriptionModal from "../DrPrescriptionModal/DrPrescriptionModal";
import AppointmentCardSkeleton from "../SimmerEffect/AppointmentCardSkeleton";
import PrescriptionHistoryModal from "../PrescriptionHistoryModal/PrescriptionHistoryModal";

const statusColors = {
  Pending: "yellow",
  Approved: "green",
  Rejected: "red",
  Completed: "blue",
  Cancelled: "gray",
};

export default function DoctorAppointmentCard(){

const navigate = useNavigate() 
const [loading, setLoading] = useState(false)
const [openedPresHist, setOpenedPresHist] = useState(false);
const [prescriptions, setPrescriptions] = useState([]);

const [openPrescription, setOpenPrescription] = useState(false);
const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
const [appointments, setAppointments] = useState([]);
const [appointmentId, setAppointmentId] = useState("")
const [selectedAppointment, setSelectedAppointment] = useState(null);

const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
const user = JSON.parse(localStorage.getItem("user"))
const doctorId = user._id

useEffect(() => {
  
  const fetchAppointments = async () => {
    setLoading(true)
    try{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/getAppointment/${doctorId}`,headers);
    setAppointments(res.data);
  }catch(err){
   localStorage.removeItem("token")
   navigate("/login")
   toast.error(err.response?.data?.msg)
}finally{
  setLoading(false)
}
}
 fetchAppointments();
}, []);

const handleUpdateStatus = async(id, currentStatus)=>{
  try{
     const res = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/admin/appointments/Update/${id}`,{currentStatus},headers)
     toast.success(res.data.msg)
     setAppointments(prev =>
      prev.map(appt =>
        appt._id === id ? { ...appt, currentStatus } : appt
      )
    );
   }catch(err){
    toast.error(err.response.data.msg || "Something went wrong")
   }
}

const handleOpenPrescription = async (appointmentId) => {
  try {
    setOpenedPresHist(true);
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/doctor/get-all-prescription/${appointmentId}`,headers
    );
    setPrescriptions(res.data.data);
    
  } catch (err) {
    toast.error(err.response?.data?.msg);
  }
};


const handleViewDetails = (appointment) => {
  setSelectedAppointment(appointment);
  setSlowTransitionOpened(true)
};

const formatToIndianDateTime = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
const handleOpenModal = (id)=>{
  setAppointmentId(id)
  setOpenPrescription(true)
}

  return (
   <>
    <Stack align="center" gap="lg" mt="md">
       { loading ? 
       <>
       <AppointmentCardSkeleton></AppointmentCardSkeleton> 
       <AppointmentCardSkeleton></AppointmentCardSkeleton> 
       <AppointmentCardSkeleton></AppointmentCardSkeleton> 
       <AppointmentCardSkeleton></AppointmentCardSkeleton> 
       </>
       :appointments.length>0 ? appointments.map((item) => (
    <Card
     key={item.id}
      shadow="md"
      radius="lg"
      p="lg"
      withBorder
      style={{
        maxWidth: "1150px",
        width: "100%",
        margin: "auto",
        background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
      }}
    >
      <Stack gap="md">
        {/* Top Section */}
        <Group justify="space-between" align="center">
          <Text fw={700} color="rgb(33, 33, 33)" size="lg">
            Appointment Details
          </Text>
          <Badge color={statusColors[item.currentStatus] || "gray"} size="lg" variant="light">
            {item.currentStatus.toUpperCase()}
          </Badge>
        </Group>

        <Divider />

        {/* Info Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          <Group gap="xs">
            <IconUser color="orangered" size={18} />
            <div>
              <Text size="xs" c="dimmed">
                Booked By
              </Text>
              <Text fw={500}>{item.user?.name}</Text>
            </div>
          </Group>

          <Group gap="xs">
            <IconPhone color="orangered" size={18} />
            <div>
              <Text size="xs" c="dimmed">
                Contact No.
              </Text>
              <Text fw={500}>{item.ptPhone}</Text>
            </div>
          </Group>

          <Group gap="xs">
            <IconCalendarTime color="orangered" size={18} />
            <div>
              <Text size="xs" c="dimmed">
                Date & Time
              </Text>
              <Text fw={500}>{formatToIndianDateTime(item.updatedAt)}</Text>
            </div>
          </Group>

          <Group gap="xs">
            <IconClockHour4 color="orangered" size={18} />
            <div>
              <Text size="xs" c="dimmed">
                Booked Slot
              </Text>
              <Text fw={500}>{item.selectedSlot}</Text>
            </div>
          </Group>
        </SimpleGrid>

        <Divider />

        {/* Buttons Section */}
        <Group justify="space-between" wrap="wrap">
          {/* Left Side Buttons */}
          <Group>
            <Button onClick={()=>handleViewDetails(item)} variant="light" >
              Patient Details
            </Button>
            <ActionIcon
              size="lg"
              variant="light"
              color="blue"
              onClick={()=>handleOpenPrescription(item._id)}
            >
              <IconEye size={18} />
            </ActionIcon>

            <ActionIcon
              size="lg"
              variant="light"
              color="teal"
              onClick={()=>handleOpenModal(item._id)}
            >
              <IconFilePlus size={18} />
            </ActionIcon>
          </Group>

          {/* Right Side Actions */}
          <Group>
            {item.currentStatus==="Pending" ? 
              <>
                <Button onClick={()=>handleUpdateStatus(item._id, "Approved")} color="green" >
                  Accept
                </Button>
                <Button onClick={()=>handleUpdateStatus(item._id, "Rejected")} color="red" variant="outline" >
                  Reject
                </Button>
              </>:item.currentStatus==="Approved"?<Button onClick={()=>handleUpdateStatus(item._id, "Completed")} color="pink" style={{border:"1px solid pink"}} variant="light">Complete..?</Button>:""
            }
          </Group>
        </Group>
      </Stack>
    </Card>
     )):"No appointement available"}
    </Stack>
                      <Modal
                         opened={slowTransitionOpened}
                         onClose={() => setSlowTransitionOpened(false)}
                         title="Appointment Patient Details"
                         transitionProps={{ transition: 'rotate-left' }}
                        //  overlayProps={{
                        //    opacity: 0.4, 
                        //  }}
                      >
                         {selectedAppointment ? (
                          <>
                          <p><b>Name:</b> {selectedAppointment.ptName}</p>
                          <p><b>Age:</b> {selectedAppointment.ptAge}</p>
                          <p><b>Phone:</b> {selectedAppointment.ptPhone}</p>
                          <p><b>Email:</b> {selectedAppointment.ptEmail}</p>
                          <p><b>Care of:</b> {selectedAppointment.ptCareOf}</p> 
                          <p><b>Address:</b> {selectedAppointment.ptAddress}</p>
                          </>
                         ) : (
                         <p>Loading...</p>
                          )}
                      </Modal>
                      {/* {Doctor Prescription modal} */}
             <DrPrescriptionModal appointmentId={appointmentId} opened={openPrescription} onClose={() => setOpenPrescription(false)}></DrPrescriptionModal>
             <PrescriptionHistoryModal openedPresHist={openedPresHist} onClosePresHist={() => setOpenedPresHist(false)} prescriptions={prescriptions} />
   </>
)}
