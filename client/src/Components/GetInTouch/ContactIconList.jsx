import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react';
import { Box, Stack, Text } from '@mantine/core';
import classes from './ContactIcons.module.css';

function ContactIcon({ icon: Icon, title, description }) {
  return (
    <div className={classes.wrapper}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

export function ContactIconsList() {
  const contactData = [
    { title: 'Email', description: 'hello@mantine.dev', icon: IconAt },
    { title: 'Phone', description: '+49 (800) 335 35 35', icon: IconPhone },
    { title: 'Address', description: '844 Morris Park avenue', icon: IconMapPin },
    { title: 'Working hours', description: '8 a.m. – 11 p.m.', icon: IconSun },
  ];

  return (
    <Stack>
      {contactData.map((item, index) => (
        <ContactIcon
          key={index}
          icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </Stack>
  );
}
