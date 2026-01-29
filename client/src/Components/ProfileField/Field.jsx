import {
  Grid,
  Text,
  ActionIcon,
  TextInput,
  NumberInput,
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';

const Field = ({ label, value, name, type = 'text', editable, setEditable }) => {
  const isEditing = editable === name;

  return (
    <Grid align="center">
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <Text fw={500}>{label}</Text>
      </Grid.Col>

      <Grid.Col span={{ base: 10, sm: 7 }}>
        {isEditing ? (
          type === 'number' ? (
            <NumberInput defaultValue={Number(value)} />
          ) : (
            <TextInput defaultValue={value} />
          )
        ) : (
          <Text>{value}</Text>
        )}
      </Grid.Col>

      <Grid.Col span={{ base: 2, sm: 1 }}>
        <ActionIcon
          variant="light"
          onClick={() => setEditable(name)}
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};

export default Field;
