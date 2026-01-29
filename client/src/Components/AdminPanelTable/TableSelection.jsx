import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {Button, Avatar, Checkbox, Group, ScrollArea, Table, Text, Modal, Loader } from '@mantine/core';
import classes from './TableSelection.module.css';
import { toast } from 'react-toastify';
import TableSkeleton from '../SimmerEffect/TableSkeleton';



export function TableSelection() {

const navigate = useNavigate()
const [loading, setLoading] = useState(false)
const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
const [appointments, setAppointments] = useState([]);
const [selectedAppointment, setSelectedAppointment] = useState(null);
const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}

useEffect(() => {
  const fetchAppointments = async () => {
    setLoading(true)
  try{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/admin/getAllAppointment`,headers);
    setAppointments(res.data);
  }catch(err){
     toast.error(err.response?.data?.msg)
     localStorage.removeItem("token")
     navigate('/login')
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

const handleViewDetails = (appointment) => {
  setSelectedAppointment(appointment);
  setSlowTransitionOpened(true)
};
  const rows = appointments.map((item,index) => {
    
    return (
      <Table.Tr key={item.id} className={item.id%2==0?classes.rowSelected:""}>
        <Table.Td>
          {index+1}
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {item.user?.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.doctor?.name}</Table.Td>
        <Table.Td><Button onClick={()=>handleViewDetails(item)}>Patient Details</Button></Table.Td>
        <Table.Td>{item.selectedSlot}</Table.Td>
        <Table.Td>{item.createdAt}</Table.Td>
        <Table.Td>{item.currentStatus==="Pending" ? <> <Button onClick={()=>handleUpdateStatus(item._id, "Rejected")} mr={10} color="orange" style={{border:"1px solid orange"}} variant="light">
          Reject
        </Button>
        <Button onClick={()=>handleUpdateStatus(item._id, "Approved")} color="green" style={{border:"1px solid green"}} variant="light">
          Accept
        </Button></>:<span className={item.currentStatus === "Rejected"
                                                     ? classes.rejected
                                                     : item.currentStatus === "Approved"
                                                     ? classes.approved
                                                     : classes.pending}>{item.currentStatus}</span>}
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea >
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr className={classes.tableHead}>
            <Table.Th>
              SR no.
            </Table.Th>
            <Table.Th>Booked by</Table.Th>
            <Table.Th>For Doctor</Table.Th>
            <Table.Th>
              <Modal
             opened={slowTransitionOpened}
             onClose={() => setSlowTransitionOpened(false)}
             title="Appointment Patient Details"
             transitionProps={{ transition: 'rotate-left' }}
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
             <p><Loader></Loader></p>
              )}
          </Modal>
              Patient Details</Table.Th>
            <Table.Th>Booked Slot</Table.Th>
             <Table.Th>Date/Time</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{loading?<TableSkeleton></TableSkeleton>:rows.length>0?rows:<span style={{color:"red"}}>"No appointment recieve yet!"</span>}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}