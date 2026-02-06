import { Card, Stack, Group, Skeleton, Divider, SimpleGrid } from "@mantine/core";

function AppointmentCardSkeleton() {

  return (
    <Card
      shadow="md"
      radius="lg"
      p="lg"
      withBorder
      style={{
        maxWidth: "1150px",
        width: "100%",
        margin: "auto",
      }}
    >
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Skeleton height={20} width={160} radius="sm" />
          <Skeleton height={26} width={100} radius="xl" />
        </Group>

        <Divider />

        {/* Info Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
          {[...Array(4)].map((_, i) => (
            <Group key={i} gap="xs">
              <Skeleton height={18} circle />
              <div style={{ flex: 1 }}>
                <Skeleton height={10} width="40%" mb={6} />
                <Skeleton height={14} width="80%" />
              </div>
            </Group>
          ))}
        </SimpleGrid>

        <Divider />

        {/* Buttons Section */}
        <Group justify="space-between" wrap="wrap">
          <Group>
            <Skeleton height={36} width={120} radius="md" />
            <Skeleton height={36} width={40} radius="md" />
            <Skeleton height={36} width={40} radius="md" />
          </Group>

          <Group>
            <Skeleton height={36} width={90} radius="md" />
            <Skeleton height={36} width={90} radius="md" />
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}

export default AppointmentCardSkeleton
