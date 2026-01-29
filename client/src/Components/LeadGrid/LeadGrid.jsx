import { Container, Grid, SimpleGrid, Card, Image, Text, Title, Button,} from '@mantine/core';
import { useNavigate } from 'react-router-dom';


const PRIMARY_COL_HEIGHT = 420;
const SECONDARY_COL_HEIGHT = 200;


export function LeadGrid() {
  const navigate = useNavigate();

  return (
    <Container size="xl" my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* Left Big Card */}
        <Card shadow="sm" radius="md" withBorder mih={PRIMARY_COL_HEIGHT}>
          <Image
            src="https://cdn.pixabay.com/photo/2016/11/08/05/29/operation-1807543_1280.jpg"
            height={300}
            radius="md"
          />
          <Title order={3} mt="md">
            Hospital Management
          </Title>
          <Text size="sm" c="dimmed">
            Manage patients, doctors, appointments, and reports efficiently.
          </Text>
        </Card>

        {/* Right Grid */}
        <Grid gutter="md">
          <Grid.Col span={12}>
            <Card  style={{
               position: "relative",
               backgroundImage: "url('https://media.istockphoto.com/id/1332985409/photo/doctor-and-nurse-medical-team-are-performing-surgical-operation-at-emergency-room-in-hospital.jpg?s=612x612&w=0&k=20&c=P3xsG4PsfEQMqYQN8OwEymuMM6IE0-Us7bJvQQ-HTr4=')",
               backgroundSize: "contain",
               backgroundPosition: "center",
               overflow: "hidden",
              color: "white"
               }} shadow="sm" radius="md" withBorder mih={SECONDARY_COL_HEIGHT}>
          <div
              style={{
               position: "absolute",
               inset: 0,
                 background: "rgba(0, 0, 0, 0.06)"
                 }}
               />
          <div style={{ position: "relative", zIndex: 1 }}>
             <h2>Appointments</h2>
              <Text mt={10} size="sm">
               Get your first Appointment
              </Text>
              <Button mt={20} color="orange" onClick={()=>navigate('/allDoctors')} >Get Your First Appointment</Button>
            </div>
              
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card  style={{
               position: "relative",
               backgroundImage: "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528')",
               backgroundSize: "cover",
               backgroundPosition: "center",
               overflow: "hidden",
              color: "white"
               }} shadow="sm" radius="md" withBorder mih={SECONDARY_COL_HEIGHT}>
                <div
              style={{
               position: "absolute",
               inset: 0,
                 background: "rgba(0,0,0,0.5)"
                 }}
               />
               <div style={{ position: "relative", zIndex: 1 }}>
                    <h2>Expert Doctors</h2>
                 <h1 style={{fontSize:"50px"}}>
                   ➔
                 </h1>
               </div>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card style={{
               position: "relative",
               backgroundImage: "url('https://www.shutterstock.com/image-photo/interior-operating-room-patient-lies-600nw-2671102429.jpg')",
               backgroundSize: "cover",
               backgroundPosition: "center",
               overflow: "hidden",
              color: "white"
               }} shadow="sm" radius="md" withBorder mih={SECONDARY_COL_HEIGHT}>
                <div
              style={{
               position: "absolute",
               inset: 0,
                 background: "rgba(0, 0, 0, 0.01)"
                 }}
               />
               <div style={{ position: "relative", zIndex: 1 }}>
                  <h2>Patients Cares</h2>
              <h1 style={{fontSize:"50px"}}>
                   ➔
                 </h1>
               </div>
           </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}