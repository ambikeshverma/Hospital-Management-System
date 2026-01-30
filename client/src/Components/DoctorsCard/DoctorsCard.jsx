import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { Badge, Button, Card, Center, Group, Image, Text,Rating } from '@mantine/core';
import classes from './FeaturesCard.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export function DoctorsCard(props) {
  const navigate = useNavigate()
  const [ratingValue, setRatingValue] = useState(4)
  const mockdata = [
  { label: props.degrees, icon: IconUsers },
  { label: `${props.experience} of practice`, icon: IconGauge },
];
  const features = mockdata.map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={16} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));
  return (
    <Card onClick={()=>navigate(`/doctor/specific/${props._id}`)} withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
  <Image src={`${import.meta.env.VITE_BACKEND_URI}${props.profileImage}`} className={classes.drImg} alt="Dr Image" />
      </Card.Section>
      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{props.name}</Text>
          <Text fz="xs" c="dimmed">
            {props.email}
          </Text>
        </div>
        <Rating defaultValue={2} onClick={()=>setRatingValue(5)} value={ratingValue} size="xs" />
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" className={`${classes.label} ${classes.expertise}`}>
          {props.expertise.join(", ")}
        </Text>

        <Group gap={8} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              ₹{props.fees}
            </Text>
            <Text fz="sm" c="dimmed" fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button className={classes.bookApt} radius="xl" style={{ flex: 1 }}>
            Book Appointment
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}