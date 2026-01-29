import {
  Card,
  Grid,
  Text,
  Group,
  ActionIcon,
  TextInput,
  NumberInput,
  Button,
  Divider,
  Stack,
  Badge,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Field from '../ProfileField/Field';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
const colors = ["blue", "orange", "red", "green"]
const [visible, { open:openLoaderOverlay, close:closeLoaderOverlay }] = useDisclosure(false);
const headers = {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
const [profile, setProfile] = useState([])
  useEffect(()=>{
    const getProfile = async()=>{
      openLoaderOverlay()
      try{
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/user/doctor/getProfile`, headers)
        setProfile(res.data)
      }catch(err){
        toast.error(err.response?.data?.msg || "Something Went wrong")
      }finally{
        closeLoaderOverlay()
      }
    }
    getProfile()
  },[])

  const [editable, setEditable] = useState(null);
  
  return (
    <Card maw={600} w="100%" withBorder radius="md" p="lg" pos="relative">
      {/* LoaderOverlay */}
                   <LoadingOverlay
                visible={visible}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
              />
      <Stack gap="md">
        <Text size="lg" fw={600}>
          Doctor Profile
        </Text>

        <Divider />

        {/* Basic Info */}
        <Field label="Name" value={profile.name} name="name" editable={editable} setEditable={setEditable} />
        <Field label="Age" value={profile.age} name="age" type="number" editable={editable} setEditable={setEditable} />
        <Field label="Email" value={profile.email} name="email" editable={editable} setEditable={setEditable} />
        <Field label="Mobile" value={`+91 ${profile.contact}`} name="mobile" editable={editable} setEditable={setEditable} />

        <Divider />

        {/* Professional Info */}
        <Field label="Degrees" value={profile.doctorProfile?.degrees} name="degree" editable={editable} setEditable={setEditable} />
        <Field label="Experience" value={profile.doctorProfile?.experience} name="experience" editable={editable} setEditable={setEditable} />
        <Field label="Expertise" value={profile.doctorProfile?.expertise} name="expertise" editable={editable} setEditable={setEditable}/>
        <Field label="Consultation Fee" value={profile.doctorProfile?.consultationFee} name="charges" editable={editable} setEditable={setEditable} />

        <Divider />

        {/* Slots & Timing */}
        <Field label="Available Slots" value={profile.doctorProfile?.slots} name="slots" editable={editable} setEditable={setEditable} />
        <Field label="Days" value="Mon - Sat" name="days" editable={editable} setEditable={setEditable} />

        <Divider />

        {/* Tags */}
        <Group>
          {
          profile.doctorProfile?.expertise.map((elem,index)=>{
              return <Badge p="md" key={index} color={`${colors[index%colors.length]}`}>{elem}</Badge>
          })}
        </Group>

        {/* Update Button */}
        <Group justify="flex-end" mt="md">
          <Button color="teal">Update Profile</Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default DoctorProfile;
