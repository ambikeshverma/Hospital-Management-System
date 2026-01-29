import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Badge,
  Table,
  Avatar
} from "@mantine/core";
import {
  IconUsers,
  IconStethoscope,
  IconCalendarStats,
  IconCurrencyRupee
} from "@tabler/icons-react";

export default function AdminDashboardHome() {
  return (
    <Container fluid>
      
      {/* 🔷 Top Section */}
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Dashboard</Title>
          <Text c="dimmed">Welcome back, Admin 👋</Text>
        </div>
        <Badge color="green" size="lg" variant="light">
          System Active
        </Badge>
      </Group>

      {/* 🔷 Stats Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Total Users</Text>
            <IconUsers size={20} />
          </Group>
          <Title order={3} mt="sm">1,240</Title>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Total Doctors</Text>
            <IconStethoscope size={20} />
          </Group>
          <Title order={3} mt="sm">85</Title>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Appointments</Text>
            <IconCalendarStats size={20} />
          </Group>
          <Title order={3} mt="sm">320</Title>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Revenue</Text>
            <IconCurrencyRupee size={20} />
          </Group>
          <Title order={3} mt="sm">₹48,500</Title>
        </Card>
      </SimpleGrid>

      {/* 🔷 Recent Appointments Table */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Recent Appointments</Title>

        <Table highlightOnHover striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Doctor</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            <Table.Tr>
              <Table.Td>
                <Group>
                  <Avatar radius="xl" />
                  <Text>Rahul Sharma</Text>
                </Group>
              </Table.Td>
              <Table.Td>Dr. Mehta</Table.Td>
              <Table.Td>29 Jan 2026</Table.Td>
              <Table.Td><Badge color="green">Completed</Badge></Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Group>
                  <Avatar radius="xl" />
                  <Text>Anita Verma</Text>
                </Group>
              </Table.Td>
              <Table.Td>Dr. Singh</Table.Td>
              <Table.Td>30 Jan 2026</Table.Td>
              <Table.Td><Badge color="yellow">Pending</Badge></Table.Td>
            </Table.Tr>

            <Table.Tr>
              <Table.Td>
                <Group>
                  <Avatar radius="xl" />
                  <Text>Vikram Patel</Text>
                </Group>
              </Table.Td>
              <Table.Td>Dr. Rao</Table.Td>
              <Table.Td>31 Jan 2026</Table.Td>
              <Table.Td><Badge color="red">Cancelled</Badge></Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Card>
    </Container>
  );
}
