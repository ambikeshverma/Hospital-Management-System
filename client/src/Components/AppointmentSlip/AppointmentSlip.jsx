import { Paper, Text, Group, Stack, Divider, Grid, Box ,Modal} from "@mantine/core";


export default function AppointmentSlip(
     openAptSlip, 
     onCloseAptSlip,
     ) {
  return (
    <Modal opened={openAptSlip} onClose={onCloseAptSlip} >
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      withBorder
      style={{
        width: "794px",
        minHeight: "1123px",
        margin: "auto",
        backgroundColor: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Stack justify="space-between" style={{ minHeight: "1080px" }}>
        
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
              <Text fw={600}>Dr. Rajesh Sharma</Text>
              <Text size="sm">MBBS, MD (Medicine)</Text>
              <Text size="sm" c="dimmed">Cardiologist</Text>
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
              <Text size="sm"><b>Patient Name:</b> Amit Verma</Text>
              <Text size="sm"><b>Age:</b> 32 Years</Text>
              <Text size="sm"><b>Care Of:</b> Suresh Verma</Text>
              <Text size="sm"><b>Contact No:</b> 9876543210</Text>
              <Text size="sm"><b>Email:</b> amit@email.com</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text size="sm"><b>Appointment ID:</b> APT-2026-0012</Text>
              <Text size="sm"><b>Date:</b> 04 Feb 2026</Text>
              <Text size="sm"><b>Booked Slot:</b> 10:30 AM</Text>
              <Text size="sm"><b>Doctor:</b> Dr. Rajesh Sharma</Text>
              <Text size="sm"><b>Specialization:</b> Cardiologist</Text>
            </Grid.Col>

            <Grid.Col span={12} mt="sm">
              <Text size="sm">
                <b>Address:</b> H.No. 45, Laxmanpuri Colony, Barabanki, Uttar Pradesh
              </Text>
            </Grid.Col>
          </Grid>
        </Box>

        {/* ================= FOOTER ================= */}
        <Box>
          <Divider my="md" />

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
    </Modal>
  );
}
