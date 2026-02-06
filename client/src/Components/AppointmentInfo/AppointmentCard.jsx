import { Card, Text, Badge, Button, Group, Stack, Loader } from "@mantine/core";
import { IconCalendarTime, IconUser, IconStethoscope } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Modal,SimpleGrid } from '@mantine/core';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";


const statusColors = {
  Pending: "yellow",
  Approved: "green",
  Rejected: "red",
  Completed: "blue",
  Cancelled: "gray",
};

export default function AppointmentCard({
  bookedBy,
  patientName,
  dateTime,
  doctorName,
  doctorIds,
  appointmentId,
  status,
  closeDrawer
}) {
const [opened, { open, close }] = useDisclosure(false);
const [loading, setLoading] = useState(false)
const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
const [availSlots, setAvailSlots] = useState([])
const [selectedSlot, setSelectedSlot] = useState(null)

const checkSlotsOfDoctor = async(doctorId)=>{
  setLoading(true)
  try{
  open()
  setSelectedSlot(null)
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/app/doctor/${doctorId}/available-slots`,headers)
  setAvailSlots(res.data.availableSlots)
  }catch(err){
    toast.error(err.response.data.msg || "Catching error problem")
  }finally{
    setLoading(false)
  }
}

const handleRebooking = async(newSlot, selectedAppointmentId)=>{
  setLoading(true)
   try{
    const res = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/app/appointments/rebook/${selectedAppointmentId}`,{newSlot}, headers)
    close()
    closeDrawer()
    toast.success(res.data.msg)
   }catch(err){
    toast.error(err.response.data.msg || "Error Catching Problem")
   }finally{
    setLoading(false)
   }
}

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      mb={20}
      withBorder
      style={{ maxWidth: 380 }}
    >
      <Stack gap="xs">
        {/* Header */}
        <Group justify="space-between">
          <Text fw={600}>Appointment Details</Text>
          <Badge color={statusColors[status] || "gray"} variant="light">
            {status.toUpperCase()}
          </Badge>
        </Group>

        {/* Info Section */}
        <Group gap="xs">
          <IconUser color="red" size={18} />
          <Text size="sm">
            <b>Booked By:</b> {bookedBy}
          </Text>
        </Group>

        <Group gap="xs">
          <IconUser color="yellow" size={18} />
          <Text size="sm">
            <b>Patient:</b> {patientName}
          </Text>
        </Group>
        <Group gap="xs">
          <IconCalendarTime color="blue" size={18} />
          <Text size="sm">
            <b>Date & Time:</b> {dateTime}
          </Text>
        </Group>

        <Group gap="xs">
          <IconStethoscope color="green" size={18} />
          <Text size="sm">
            <b>Doctor:</b> {doctorName}
          </Text>
        </Group>
         
        <Modal zIndex={2200} size={"600"} opened={opened} onClose={close} title="Available Slots" centered>
          <Text size="sm" mb={10} > <b>For Doctor :</b> {doctorName} </Text> 
            
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md" >
                  {loading ? <Loader size={30}></Loader> : availSlots?.length >0 ? availSlots.map((slot) => (
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
                <div style={{width:"100%", display:"flex",justifyContent:"end"}}>
                <Button onClick={()=>handleRebooking(selectedSlot,appointmentId)} size="md" radius="md" mt={25} disabled={!selectedSlot}>
                          {loading?<Loader size={25} color="white"></Loader>: "Book Again"}
                </Button>
                </div>
        </Modal> 

        {/* Rebook Button (Only if approved) */}
        {status === "Completed" && (
          <Button fullWidth mt="sm" variant="light" onClick={()=>checkSlotsOfDoctor(doctorIds)}>
            Rebook Appointment
          </Button>
        )}
      </Stack>
    </Card>
  );
}
