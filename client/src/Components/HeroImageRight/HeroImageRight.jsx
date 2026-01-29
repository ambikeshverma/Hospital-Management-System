import { Button, Container, Text, Title } from '@mantine/core';
import classes from './HeroImageRight.module.css';
import { useNavigate } from 'react-router-dom';

export function HeroImageRight() {
  const navigate = useNavigate()
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                fully featured
              </Text>{' '}
              Hospital Management System
            </Title>

            <Text className={classes.description} mt={30}>
              A smart and efficient Hospital Management System designed to simplify healthcare operations.
               Manage doctors, patients, and appointments in one place.
               Your complete digital solution for modern healthcare management.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
              onClick={()=>navigate('/allDoctors')}
            >
              Find Doctors
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}