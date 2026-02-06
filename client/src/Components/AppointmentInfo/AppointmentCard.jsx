import { Card, Text, Badge, Button, Group, Stack, Loader } from "@mantine/core";
import { IconCalendarTime, IconUser, IconStethoscope } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { Modal,SimpleGrid } from '@mantine/core';
import axios from "axios";
import { useRef,useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import AppointmentSlip from "../AppointmentSlip/AppointmentSlip";
import { Paper, Divider, Grid, Box } from "@mantine/core";


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
  ptEmail,
  ptPhone,
  ptAge,
  ptCareOf,
  ptAddress,
  alotedSlot,
  updatedAt,
  dateTime,
  doctorName,
  doctorIds,
  doctorDegrees,
  doctorExpertise,
  appointmentId,
  status,
  closeDrawer,
}) {
  const layoutRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
const [opened, { open, close }] = useDisclosure(false);
const [openAptSlip, setOpenAptSlip] = useState(false)
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

const handleDownloadPDF = async () => {
  if (!layoutRef.current) return;

  try {
    setDownloading(true);

    const canvas = await html2canvas(layoutRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdf = new jsPDF({
      orientation: imgWidth > imgHeight ? "landscape" : "portrait",
      unit: "px",
      format: [imgWidth, imgHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("Prescription.pdf");

  } catch (error) {
    console.error("PDF download failed:", error);
  } finally {
    setDownloading(false);
    setOpenAptSlip(false);
  }
};



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
        {/* <AppointmentSlip openAptSlip={openAptSlip} onCloseAptSlip={()=>setOnCloseAptSlip(false)}></AppointmentSlip> */}
        <Modal zIndex={2200} size={900} opened={openAptSlip} onClose={()=>setOpenAptSlip(false)} title="Preview" >
          <div
             ref={layoutRef}
             style={{
               background: "white",
               padding: "20px",
               borderRadius: "8px",
             }}
             >
            <Paper
              shadow="md"
              p="xl"
              radius="md"
              withBorder
              style={{
                width: "794px",
                minHeight: "500px",
                margin: "auto",
                backgroundColor: "white",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <Stack justify="space-between" style={{ minHeight: "450px" }}>
                
                {/* ================= HEADER ================= */}
                <Box>
                  <Text align="center" fw={700} size="xl">
                    XYZ HOSPITAL
                  </Text>
                  <Text align="center" size="sm" c="dimmed">
                    21, Health Street, Lucknow, Uttar Pradesh – 226001 | Ph: 9876543210
                  </Text>
        
                  <Divider my="sm" />
        
                  <Group justify="space-between" align="flex-start" mt="sm">
                    <Box>
                      <Text fw={600}>{doctorName}</Text>
                      <Text size="sm">{doctorDegrees} (Medicine)</Text>
                      <Text size="sm" c="dimmed">{doctorExpertise}</Text>
                    </Box>
        
                    <Box ta="right">
                      <Text fw={500}>Consultation Timing</Text>
                      <Text size="sm">Mon – Sat</Text>
                      <Text size="sm">10:00 AM – 4:00 PM</Text>
                    </Box>
                  </Group>
                </Box>
        
                {/* ================= BODY ================= */}
                <Box>
                  <Divider label="Appointment Details" labelPosition="center" my="md" />
        
                  <Grid>
                    <Grid.Col span={6}>
                      <Text size="sm"><b>Patient Name:</b>{patientName}</Text>
                      <Text size="sm"><b>Age:</b>{ptAge}</Text>
                      <Text size="sm"><b>Care Of:</b> {ptCareOf}</Text>
                      <Text size="sm"><b>Contact No:</b>{ptPhone}</Text>
                      <Text size="sm"><b>Email:</b> {ptEmail}</Text>
                    </Grid.Col>
        
                    <Grid.Col span={6}>
                      <Text size="sm"><b>Appointment ID:</b> {appointmentId}</Text>
                      <Text size="sm"><b>Date:</b>{formatToIndianDateTime(updatedAt)}</Text>
                      <Text size="sm"><b>Booked Slot:</b> {alotedSlot}</Text>
                      <Text size="sm"><b>Doctor:</b> {doctorName}</Text>
                      <Text size="sm"><b>Specialization:</b>{doctorExpertise}</Text>
                    </Grid.Col>
        
                    <Grid.Col span={12} >
                      <Text size="sm">
                        <b>Address:</b>{ptAddress}
                      </Text>
                    </Grid.Col>
                  </Grid>
                </Box>
        
                {/* ================= FOOTER ================= */}
                <Box>
                  <Divider />
        
                  <Text size="xs" c="dimmed">
                    • Please arrive 15 minutes before your scheduled appointment time.  
                    • Carry previous medical records and prescriptions.  
                    • Appointment is valid only for the mentioned date and time.  
                    • Hospital remains closed on Sundays and Government Holidays.  
                    • Emergency services are available 24×7.
                  </Text>
        
                  <Text align="center" size="xs" mt="md" c="dimmed">
                    Thank you for choosing XYZ Hospital. Wishing you good health!
                  </Text>
                </Box>
        
              </Stack>
            </Paper>
            </div>
            <Button
                   fullWidth
                   onClick={handleDownloadPDF}
                   loading={downloading}
                   disabled={downloading}
                 >
                   {downloading ? "Downloading PDF..." : "Download PDF"}
                 </Button>
            </Modal>

        {/* Rebook Button (Only if approved) */}
        {status==="Approved"?<Button onClick={()=>setOpenAptSlip(true)}>View Slip</Button>:status === "Completed" && (
          <Button fullWidth mt="sm" variant="light" onClick={()=>checkSlotsOfDoctor(doctorIds)}>
            Rebook Appointment
          </Button>
        )}
      </Stack>
    </Card>
  );
}
